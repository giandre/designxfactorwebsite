import type { LeadGenData } from '../../../types/leadgen';

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  NOTIFICATION_EMAIL: string;
  WEBSITE_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data: LeadGenData = await context.request.json();

    // Validate required fields
    if (!data.contact?.name || !data.contact?.email || !data.contact?.company) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert into D1 database
    const result = await context.env.DB.prepare(`
      INSERT INTO lead_submissions (
        name, email, company, role,
        content_type, challenge, challenge_comment,
        location, org_type, org_type_comment, readiness,
        outcome, recommended_services,
        ip_address, user_agent, referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.contact.name,
      data.contact.email,
      data.contact.company,
      data.contact.role || null,
      data.answers.contentType || null,
      data.answers.challenge || null,
      data.answers.challengeComment || null,
      data.answers.location || null,
      data.answers.orgType || null,
      data.answers.orgTypeComment || null,
      data.answers.readiness || null,
      data.outcome || null,
      data.recommendedServices ? JSON.stringify(data.recommendedServices) : null,
      context.request.headers.get('CF-Connecting-IP'),
      context.request.headers.get('User-Agent'),
      context.request.headers.get('Referer')
    ).run();

    // Send initial notification email (optional - may want to send only for hot leads)
    if (data.outcome === 'hot') {
      await sendLeadNotification(context.env, data, 'new_lead');
    }

    return new Response(JSON.stringify({
      success: true,
      id: result.meta.last_row_id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error submitting lead:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function sendLeadNotification(env: Env, data: LeadGenData, type: 'new_lead' | 'contact_request' | 'pdf_download') {
  const emailSubject = type === 'contact_request'
    ? `🔥 HOT LEAD: Contact Request - ${data.contact.name}`
    : type === 'pdf_download'
    ? `📄 PDF Downloaded - ${data.contact.name}`
    : `🎯 New Lead: ${data.contact.name} from ${data.contact.company}`;

  const recommendedServicesHtml = data.recommendedServices
    ? `<ul>${data.recommendedServices.map(s => `<li>${s}</li>`).join('')}</ul>`
    : '<p>None specified</p>';

  const emailHtml = `
    <h2>New Lead from Design X Factor Discovery</h2>
    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${data.contact.name}</li>
      <li><strong>Email:</strong> <a href="mailto:${data.contact.email}">${data.contact.email}</a></li>
      <li><strong>Company:</strong> ${data.contact.company}</li>
      ${data.contact.role ? `<li><strong>Role:</strong> ${data.contact.role}</li>` : ''}
    </ul>

    <h3>Discovery Answers</h3>
    <ul>
      <li><strong>Content Type:</strong> ${data.answers.contentType || 'Not specified'}</li>
      <li><strong>Challenge:</strong> ${data.answers.challenge || 'Not specified'}${data.answers.challengeComment ? ` - ${data.answers.challengeComment}` : ''}</li>
      <li><strong>Location:</strong> ${data.answers.location || 'Not specified'}</li>
      <li><strong>Organization Type:</strong> ${data.answers.orgType || 'Not specified'}${data.answers.orgTypeComment ? ` - ${data.answers.orgTypeComment}` : ''}</li>
      <li><strong>Readiness:</strong> ${data.answers.readiness || 'Not specified'}</li>
    </ul>

    <h3>Outcome</h3>
    <p><strong>Lead Score:</strong> <span style="color: ${data.outcome === 'hot' ? '#DC2626' : data.outcome === 'warm' ? '#F59E0B' : '#3B82F6'}; font-weight: bold; text-transform: uppercase;">${data.outcome || 'Unknown'}</span></p>

    <h3>Recommended Services</h3>
    ${recommendedServicesHtml}

    ${type === 'contact_request' ? `
      <hr style="margin: 20px 0; border: none; border-top: 2px solid #DC2626;">
      <h3 style="color: #DC2626;">🔥 CONTACT REQUESTED!</h3>
      <p><strong>${data.contact.name}</strong> clicked "Contact Me" and wants to schedule a discovery call.</p>
      <p><strong>Action Required:</strong> Reach out ASAP to: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
    ` : ''}

    ${type === 'pdf_download' ? `
      <hr style="margin: 20px 0;">
      <p><strong>${data.contact.name}</strong> downloaded their personalized PDF report.</p>
    ` : ''}

    <hr style="margin: 20px 0;">
    <p style="color: #64748B; font-size: 12px;">
      Submitted: ${new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'America/New_York'
      })} EST
    </p>
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
