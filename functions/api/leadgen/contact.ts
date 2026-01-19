import type { LeadGenData } from '../../../types/leadgen';

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  NOTIFICATION_EMAIL: string;
  WEBSITE_URL: string;
}

interface ContactRequest {
  leadData: LeadGenData;
  action: 'contact_me' | 'pdf_download';
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { leadData, action }: ContactRequest = await context.request.json();

    // Find existing lead by email
    const existingLead = await context.env.DB.prepare(
      'SELECT id FROM lead_submissions WHERE email = ? ORDER BY created_at DESC LIMIT 1'
    ).bind(leadData.contact.email).first();

    let leadId: number;

    if (existingLead) {
      // Update existing lead
      leadId = existingLead.id as number;

      if (action === 'contact_me') {
        await context.env.DB.prepare(`
          UPDATE lead_submissions
          SET contact_requested = 1,
              contact_requested_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(leadId).run();
      } else if (action === 'pdf_download') {
        await context.env.DB.prepare(`
          UPDATE lead_submissions
          SET pdf_downloaded = 1,
              pdf_downloaded_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(leadId).run();
      }
    } else {
      // Create new lead if doesn't exist
      const result = await context.env.DB.prepare(`
        INSERT INTO lead_submissions (
          name, email, company, role,
          content_type, challenge, challenge_comment,
          location, org_type, org_type_comment, readiness,
          outcome, recommended_services,
          contact_requested, contact_requested_at,
          pdf_downloaded, pdf_downloaded_at,
          ip_address, user_agent, referrer
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        leadData.contact.name,
        leadData.contact.email,
        leadData.contact.company,
        leadData.contact.role || null,
        leadData.answers.contentType || null,
        leadData.answers.challenge || null,
        leadData.answers.challengeComment || null,
        leadData.answers.location || null,
        leadData.answers.orgType || null,
        leadData.answers.orgTypeComment || null,
        leadData.answers.readiness || null,
        leadData.outcome || null,
        leadData.recommendedServices ? JSON.stringify(leadData.recommendedServices) : null,
        action === 'contact_me' ? 1 : 0,
        action === 'contact_me' ? new Date().toISOString() : null,
        action === 'pdf_download' ? 1 : 0,
        action === 'pdf_download' ? new Date().toISOString() : null,
        context.request.headers.get('CF-Connecting-IP'),
        context.request.headers.get('User-Agent'),
        context.request.headers.get('Referer')
      ).run();

      leadId = result.meta.last_row_id as number;
    }

    // Send email notifications (both to Gio and user confirmation)
    await sendNotification(context.env, leadData, action);

    // Send confirmation email to user (only for contact_me action)
    if (action === 'contact_me') {
      await sendUserConfirmation(context.env, leadData);
    }

    return new Response(JSON.stringify({
      success: true,
      id: leadId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error tracking contact:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function sendNotification(env: Env, data: LeadGenData, action: 'contact_me' | 'pdf_download') {
  const isContactRequest = action === 'contact_me';

  const emailSubject = isContactRequest
    ? `🔥 HOT LEAD: ${data.contact.name} wants to connect!`
    : `📄 PDF Download: ${data.contact.name} from ${data.contact.company}`;

  const recommendedServicesHtml = data.recommendedServices
    ? `<ul>${data.recommendedServices.map(s => `<li>${s}</li>`).join('')}</ul>`
    : '<p>None specified</p>';

  const priorityBanner = isContactRequest ? `
    <div style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: white; margin: 0; font-size: 24px;">🔥 CONTACT REQUESTED - Action Required!</h2>
      <p style="color: #FEE2E2; margin: 10px 0 0 0; font-size: 16px;">
        ${data.contact.name} clicked "Contact Me" and is waiting to hear from you.
      </p>
    </div>
  ` : '';

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${emailSubject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; padding: 20px;">
      ${priorityBanner}

      <h2 style="color: #0F172A; border-bottom: 3px solid #DC2626; padding-bottom: 10px;">Lead Information</h2>

      <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #DC2626;">Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px 0;">${data.contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${data.contact.email}" style="color: #2563EB; text-decoration: none;">
                ${data.contact.email}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Company:</td>
            <td style="padding: 8px 0;">${data.contact.company}</td>
          </tr>
          ${data.contact.role ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Role:</td>
            <td style="padding: 8px 0;">${data.contact.role}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #0F172A;">Discovery Answers</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
            <strong>Needs:</strong> ${data.answers.contentType ? data.answers.contentType.charAt(0).toUpperCase() + data.answers.contentType.slice(1) : 'Not specified'}
          </li>
          <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
            <strong>Challenge:</strong> ${data.answers.challenge || 'Not specified'}
            ${data.answers.challengeComment ? `<br><em style="color: #64748B;">"${data.answers.challengeComment}"</em>` : ''}
          </li>
          <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
            <strong>Location:</strong> ${data.answers.location || 'Not specified'}
          </li>
          <li style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
            <strong>Org Type:</strong> ${data.answers.orgType || 'Not specified'}
            ${data.answers.orgTypeComment ? `<br><em style="color: #64748B;">"${data.answers.orgTypeComment}"</em>` : ''}
          </li>
          <li style="padding: 8px 0;">
            <strong>Timeline:</strong> ${data.answers.readiness || 'Not specified'}
          </li>
        </ul>
      </div>

      <div style="background: ${data.outcome === 'hot' ? '#FEE2E2' : data.outcome === 'warm' ? '#FEF3C7' : '#DBEAFE'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${data.outcome === 'hot' ? '#DC2626' : data.outcome === 'warm' ? '#F59E0B' : '#3B82F6'}; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #0F172A;">Lead Score</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 0; color: ${data.outcome === 'hot' ? '#DC2626' : data.outcome === 'warm' ? '#D97706' : '#2563EB'}; text-transform: uppercase;">
          ${data.outcome || 'Unknown'}
        </p>
      </div>

      <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #0F172A;">Recommended Services</h3>
        ${recommendedServicesHtml}
      </div>

      ${isContactRequest ? `
        <div style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <p style="color: white; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">
            ⏰ Quick Action Required
          </p>
          <a href="mailto:${data.contact.email}?subject=Re: Your Design X Factor Discovery&body=Hi ${data.contact.name},%0A%0AThank you for your interest in Design X Factor! I'd love to schedule a quick call to discuss your ${data.contact.company} project.%0A%0AWhen would be a good time for you?%0A%0ABest,%0AGio"
             style="display: inline-block; background: white; color: #DC2626; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
            📧 Reply to ${data.contact.name}
          </a>
        </div>
      ` : ''}

      <div style="border-top: 2px solid #E2E8F0; padding-top: 20px; margin-top: 30px;">
        <p style="color: #64748B; font-size: 13px; margin: 5px 0;">
          <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'America/New_York'
          })} EST
        </p>
        <p style="color: #64748B; font-size: 13px; margin: 5px 0;">
          <strong>Action:</strong> ${isContactRequest ? '🔥 Contact Requested' : '📄 PDF Downloaded'}
        </p>
      </div>

      <div style="margin-top: 30px; padding: 15px; background: #F1F5F9; border-radius: 6px; text-align: center;">
        <p style="color: #475569; font-size: 12px; margin: 0;">
          This notification was sent from <strong>Design X Factor Lead Generation</strong><br>
          <a href="${env.WEBSITE_URL}" style="color: #2563EB; text-decoration: none;">designxfactor.com</a>
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.NOTIFICATION_EMAIL],
        subject: emailSubject,
        html: emailHtml
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Resend API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}

async function sendUserConfirmation(env: Env, data: LeadGenData) {
  const userEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - Design X Factor</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F8FAFC;">
      <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 40px 20px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">
          Design <span style="color: #FF4D6D;">X</span> Factor
        </h1>
        <p style="color: #E2E8F0; margin: 10px 0 0 0; font-size: 16px;">
          We've received your request!
        </p>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #0F172A; margin-top: 0; font-size: 24px;">
          Hi ${data.contact.name}! 👋
        </h2>

        <p style="color: #475569; font-size: 16px; line-height: 1.8;">
          Thank you for your interest in working with Design X Factor! We're excited to learn more about your project at <strong>${data.contact.company}</strong>.
        </p>

        <div style="background: linear-gradient(135deg, #FF4D6D20 0%, #FF4D6D10 100%); border-left: 4px solid #FF4D6D; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <p style="margin: 0; color: #0F172A; font-size: 16px; font-weight: 600;">
            ✅ What happens next?
          </p>
          <p style="margin: 10px 0 0 0; color: #475569; font-size: 15px;">
            Gio will reach out to you within <strong>24 hours</strong> to schedule a discovery call. We'll discuss your needs and show you exactly what we can create for you.
          </p>
        </div>

        <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <p style="margin: 0 0 15px 0; color: #0F172A; font-weight: 600;">Your Information:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 14px;">Name:</td>
              <td style="padding: 6px 0; color: #1E293B; font-size: 14px; font-weight: 500;">${data.contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 14px;">Email:</td>
              <td style="padding: 6px 0; color: #1E293B; font-size: 14px; font-weight: 500;">${data.contact.email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748B; font-size: 14px;">Company:</td>
              <td style="padding: 6px 0; color: #1E293B; font-size: 14px; font-weight: 500;">${data.contact.company}</td>
            </tr>
          </table>
        </div>

        <p style="color: #475569; font-size: 15px; line-height: 1.8;">
          In the meantime, feel free to explore our <a href="${env.WEBSITE_URL}/#portfolio" style="color: #FF4D6D; text-decoration: none; font-weight: 600;">portfolio</a> to see examples of our work.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:gio@designxfactor.com"
             style="display: inline-block; background: linear-gradient(135deg, #FF4D6D 0%, #DC2626 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(255, 77, 109, 0.3);">
            Reply to This Email
          </a>
        </div>

        <p style="color: #475569; font-size: 15px; line-height: 1.8; margin-top: 30px;">
          Looking forward to connecting soon!
        </p>

        <p style="color: #0F172A; font-size: 16px; font-weight: 600; margin-bottom: 5px;">
          Gio Duarte
        </p>
        <p style="color: #64748B; font-size: 14px; margin: 0;">
          Founder, Design X Factor<br>
          <a href="mailto:gio@designxfactor.com" style="color: #FF4D6D; text-decoration: none;">gio@designxfactor.com</a>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; color: #94A3B8; font-size: 13px;">
        <p style="margin: 0;">
          Design X Factor | Creating Engaging Learning Experiences<br>
          <a href="${env.WEBSITE_URL}" style="color: #64748B; text-decoration: none;">designxfactor.com</a>
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [data.contact.email],
        subject: "We've received your request - Design X Factor",
        html: userEmailHtml
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error (user confirmation):', errorText);
      throw new Error(`Resend API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send user confirmation email:', error);
    throw error;
  }
}
