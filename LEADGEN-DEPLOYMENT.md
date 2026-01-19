# Lead Generation System - Deployment Guide

## Overview

The lead generation system is now fully implemented with:
- ✅ PDF generation (jsPDF)
- ✅ Cloudflare D1 database for lead tracking
- ✅ Cloudflare Pages Functions for API endpoints
- ✅ Resend email notifications
- ✅ "Contact Me" button with tracking
- ✅ PDF download tracking

## Database Setup

### D1 Database Created
- **Database Name:** `dxf-leads`
- **Database ID:** `774b5258-b6da-45ba-a3b0-9372c96cbc0c`
- **Region:** ENAM (Eastern North America)
- **Schema:** Already deployed to remote database

### Database Schema
The database tracks:
- Contact information (name, email, company, role)
- All questionnaire answers
- Computed outcome (hot/warm/nurture)
- Recommended services
- Tracking fields (contact_requested, pdf_downloaded with timestamps)
- Metadata (IP, user agent, referrer, UTM parameters)

## API Endpoints

### 1. Submit Lead: `POST /api/leadgen`
Automatically called when user reaches the outcome page.
- Inserts lead into database
- Sends email notification for "hot" leads
- Returns `{ success: true, id: number }`

### 2. Track Contact: `POST /api/leadgen/contact`
Called when user clicks "Contact Me" or downloads PDF.
- Updates existing lead or creates new one
- Tracks action (contact_me or pdf_download)
- Sends priority email notification
- Returns `{ success: true, id: number }`

## Email Notifications

### Configuration (from wrangler.toml)
```toml
RESEND_API_KEY = "re_5uJZEjZU_1MxfE4Mb5KqDHt5crxVW4iPS"
RESEND_FROM_EMAIL = "gio@learningxperience.tech"
NOTIFICATION_EMAIL = "gio@designxfactor.com"
```

### Email Types
1. **Hot Lead Notification** - Sent when hot lead completes questionnaire
2. **Contact Request** - Priority email with red banner when user clicks "Contact Me"
3. **PDF Download** - Notification when user downloads their PDF report

### Email Features
- Beautiful HTML formatting
- Lead score color coding (Red=Hot, Orange=Warm, Blue=Nurture)
- Full contact information and discovery answers
- Quick reply button in "Contact Request" emails
- Timestamp in EST timezone

## PDF Generation

### Implementation
- Uses `jspdf` library (v2.5.1)
- Brand colors: DXF Red (#DC2626), Dark (#0F172A)
- 5-page document:
  1. Cover page with personalized greeting
  2. Discovery summary with all answers
  3. Recommended services with details
  4. Why Design X Factor (4 key points)
  5. Next steps and contact information

### Features
- Personalized with user's name and company
- Displays all questionnaire answers
- Lists recommended services with descriptions
- Includes delivery time, compliance, and quality stats
- Professional branding throughout

## Testing the System

### Local Testing (Development)

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the lead gen page:**
   ```
   http://localhost:5173/#leadgen
   ```

3. **Test the flow:**
   - Click through landing page
   - Fill out contact form
   - Answer all 5 questions
   - Verify outcome page displays correctly
   - Test PDF download (should generate and download)
   - Test "Contact Me" button (will fail without backend)

### Testing with Backend (Local Dev)

To test the full system locally with Cloudflare Pages Functions:

```bash
# Install wrangler globally if not already installed
npm install -g wrangler

# Run local dev server with Functions
npx wrangler pages dev dist --d1 DB=dxf-leads --binding RESEND_API_KEY=re_5uJZEjZU_1MxfE4Mb5KqDHt5crxVW4iPS --binding RESEND_FROM_EMAIL=gio@learningxperience.tech --binding NOTIFICATION_EMAIL=gio@designxfactor.com --binding WEBSITE_URL=http://localhost:8788

# Note: You'll need to build first
npm run build
```

### Production Testing

After deployment to Cloudflare Pages:

1. Visit the production URL
2. Complete the full questionnaire
3. Verify:
   - Lead is saved to D1 database
   - Email notification is sent to gio@designxfactor.com
   - PDF downloads successfully
   - "Contact Me" button triggers email
   - All tracking fields are updated

## Deployment to Cloudflare Pages

### Prerequisites
- Cloudflare account with Pages enabled
- GitHub repository connected to Cloudflare Pages (if using Git deployment)
- Wrangler CLI installed and authenticated

### Build Settings
```
Build command: npm run build
Build output directory: dist
Node version: 18+
```

### Environment Variables
These are already configured in `wrangler.toml` but can also be set in Cloudflare dashboard:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NOTIFICATION_EMAIL`
- `WEBSITE_URL`

### D1 Database Binding
In Cloudflare Pages settings:
1. Go to Settings > Functions > D1 database bindings
2. Add binding:
   - Variable name: `DB`
   - D1 database: `dxf-leads`

### Deploy via Wrangler

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=designxfactor
```

### Deploy via Git (Recommended)

1. Push changes to your Git repository
2. Cloudflare Pages will automatically build and deploy
3. Check build logs for any issues
4. Verify Functions are deployed (check Functions tab in dashboard)

## Monitoring and Analytics

### Check Lead Submissions

Query the database to see all leads:

```bash
npx wrangler d1 execute dxf-leads --remote --command "SELECT * FROM lead_submissions ORDER BY created_at DESC LIMIT 10"
```

### View Hot Leads Only

```bash
npx wrangler d1 execute dxf-leads --remote --command "SELECT name, email, company, outcome, created_at FROM lead_submissions WHERE outcome = 'hot' ORDER BY created_at DESC"
```

### Check Contact Requests

```bash
npx wrangler d1 execute dxf-leads --remote --command "SELECT name, email, company, contact_requested_at FROM lead_submissions WHERE contact_requested = 1 ORDER BY contact_requested_at DESC"
```

### Get Analytics

```bash
npx wrangler d1 execute dxf-leads --remote --command "SELECT outcome, COUNT(*) as count FROM lead_submissions GROUP BY outcome"
```

## Troubleshooting

### PDF Not Generating
- Check browser console for errors
- Verify jspdf is loaded (should see in Network tab)
- Test with different browsers

### API Calls Failing
- Check Cloudflare Pages Functions logs
- Verify D1 binding is configured correctly
- Check environment variables are set

### Emails Not Sending
- Verify Resend API key is valid
- Check Resend dashboard for delivery status
- Verify sender email is verified in Resend

### Database Errors
- Check D1 database exists: `npx wrangler d1 list`
- Verify schema is deployed: `npx wrangler d1 execute dxf-leads --remote --command "SELECT name FROM sqlite_master WHERE type='table'"`
- Check database ID matches wrangler.toml

## File Structure

```
g:\z-CUSTOM_DEV\designxfactorwebsite\
├── functions/                       # Cloudflare Pages Functions
│   └── api/
│       └── leadgen/
│           ├── index.ts            # POST /api/leadgen - Submit lead
│           └── contact.ts          # POST /api/leadgen/contact - Track actions
├── pages/leadgen/                  # React components
│   ├── LeadGen.tsx                # Main flow container
│   ├── LeadGenLanding.tsx         # Landing page with video
│   ├── LeadGenContact.tsx         # Contact form
│   ├── LeadGenQuestions.tsx       # 5-question flow
│   ├── LeadGenProcessing.tsx      # Loading animation
│   └── LeadGenOutcome.tsx         # Results page (HOT)
├── context/
│   └── LeadGenContext.tsx         # State management
├── utils/
│   ├── leadgenLogic.ts            # Scoring algorithm
│   ├── generatePDF.ts             # PDF generation (NEW)
│   └── api.ts                     # API client (NEW)
├── types/
│   └── leadgen.ts                 # TypeScript types
├── schema.sql                      # Database schema
├── wrangler.toml                   # Cloudflare configuration
└── LEADGEN-DEPLOYMENT.md          # This file
```

## Next Steps

1. ✅ Deploy to production
2. ✅ Test full flow in production
3. ✅ Monitor first leads in D1 database
4. ✅ Verify emails are being received
5. ✅ Check PDF downloads work correctly
6. Consider adding:
   - Analytics dashboard
   - Lead follow-up tracking
   - A/B testing different questions
   - Integration with CRM system

## Support

For issues or questions:
- Check Cloudflare Pages logs
- Review Resend dashboard for email delivery
- Query D1 database for lead data
- Check browser console for frontend errors

## Cost Estimates

- **Cloudflare D1:** Free tier includes 5M reads/day, 100K writes/day
- **Cloudflare Pages Functions:** Free tier includes 100K requests/day
- **Resend:** Free tier includes 100 emails/day
- **Total:** Free for expected traffic volume (< 1000 leads/month)

---

**Status:** ✅ System is ready for production deployment
**Last Updated:** 2026-01-19
