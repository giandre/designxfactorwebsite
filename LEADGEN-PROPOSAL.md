# Design X Factor - Lead Generation Page Proposal

## Executive Summary

Based on the UCF BIP lead generation model and your business needs, I'm proposing an interactive lead qualification experience for booth/conference visitors that:

1. **Educates** prospects about your value proposition through a short video
2. **Qualifies** leads through targeted questions
3. **Segments** prospects into actionable categories (Hot/Warm/Nurture/Not Fit)
4. **Delivers** personalized recommendations and next steps

---

## User Flow Overview

```
QR Code Scan → Landing (Video) → Contact Form → 5 Questions → Outcome Page → PDF Download
```

**Estimated time:** 2-3 minutes
**Target completion rate:** 75%+

---

## Page Structure

### 1. Landing Page (`/leadgen` or `/start`)

**Purpose:** Hook attention, establish credibility, introduce the experience

**Elements:**
- DXF Logo + "Let's Make Learning Unforgettable"
- **Hero Video** (30-60 seconds):
  - Opening: "Most training delivers information. We create experiences."
  - Show before/after examples (static PDF → interactive course)
  - Highlight the "3 B's" (Bueno, Bonito, Barato)
  - End with: "In 2 minutes, find out what we can do for you."
- **Stats bar:**
  - "2-4 weeks delivery"
  - "WCAG 2.1 AA Compliant"
  - "Bueno • Bonito • Barato"
- **CTA Button:** "Start Your Project Discovery" (brand-red)

---

### 2. Contact Form Page (`/leadgen/contact`)

**Purpose:** Capture contact info before investing time

**Fields:**
- Name (required)
- Email (required)
- Company/Organization (required)
- Role/Title (optional)

**Validation:** All required fields before proceeding
**Storage:** sessionStorage + database on final submission

**Copy:**
```
"Let's get to know you"

We'll use this to personalize your recommendations and
send you a custom report.
```

---

### 3. Qualification Questions (`/leadgen/questions`)

**Purpose:** Understand needs, readiness, and fit

**Question Flow:**

#### Q1: What type of content do you need?
*Purpose: Identify primary service interest*

Options:
- 📚 Interactive eBooks
- 🎥 Video Lessons
- 🎧 Audio/Podcasts
- 🎓 Full Course Development
- ♿ Accessibility Remediation
- 🎯 Multiple/Not Sure

#### Q2: What's your biggest content challenge?
*Purpose: Identify pain point*

Options:
- 😴 Low engagement/completion rates
- ⏰ Content takes too long to create
- 📱 Not mobile-friendly or accessible
- 💰 Budget constraints for quality production
- 🔄 Content needs constant updates
- 📊 Can't track if message is landing
- ✏️ Other (comment field)

#### Q3: Where is your organization based?
*Purpose: Qualify geography (future expansion consideration)*

Options:
- 🇺🇸 United States
- 🌍 International (English content)
- 🌎 International (Multi-language needs)

#### Q4: What type of organization are you?
*Purpose: Segment audience, tailor recommendations*

Options:
- 🏢 Corporate Training/L&D
- 🎓 Higher Education
- 📖 K-12 Education
- 🏥 Healthcare/Medical
- 💼 Government/Non-Profit
- 🛍️ Marketing/Lead Gen
- 💡 Other

#### Q5: When are you looking to start?
*Purpose: Determine readiness level*

Options:
- ✅ Ready now (have content & budget)
- 📅 In 1-3 months (planning phase)
- 🗓️ 3-6 months (exploring options)
- 🔮 Just researching

---

## Outcome Logic & Lead Scoring

### Lead Categories

#### 🔥 **HOT LEAD** (Ready to Convert)
**Criteria:**
- Readiness = "ready_now"
- Challenge indicates clear need
- Organization type in target segments (Corporate, Higher Ed, Marketing)

**Outcome Page Shows:**
- ✅ Personalized welcome with name
- ✅ Recommended services based on answers
- ✅ Estimated timeline & pricing range
- ✅ **Full contact info:**
  - Email: hello@designxfactor.com
  - Calendly booking link (prominent CTA)
  - Phone (if you want to add one)
- ✅ PDF download with full details
- ✅ "Next Steps" action items

**Follow-up:** Immediate notification to you, calendar booking encouraged

---

#### 🌡️ **WARM LEAD** (Good Fit, Not Ready)
**Criteria:**
- Readiness = "1-3 months" or "3-6 months"
- Good fit on other dimensions
- Has clear need

**Outcome Page Shows:**
- ✅ Personalized welcome
- ✅ Recommended services
- ✅ Educational content (case studies, samples)
- ✅ Email contact only
- ⛔ NO Calendly link (not ready yet)
- ⛔ NO phone
- ✅ PDF download (nurture material)
- ✅ "When you're ready" messaging

**Follow-up:** Email nurture sequence, add to newsletter

---

#### 🌱 **NURTURE LEAD** (Early Stage)
**Criteria:**
- Readiness = "just_researching"
- May not have clear budget/content yet
- Genuine interest but not ready

**Outcome Page Shows:**
- ✅ Friendly message
- ✅ Educational resources
- ✅ Link to portfolio samples
- ✅ Website link
- ⛔ NO personal contact info
- ⛔ NO PDF download
- ✅ "Explore our work" messaging

**Follow-up:** Add to newsletter, low-touch nurture

---

#### ❌ **NOT A FIT** (Polite Redirect)
**Criteria:**
- Looking for DIY tools (we don't sell tools)
- Unrealistic expectations (free/extremely low budget with high demands)
- Outside service scope

**Outcome Page Shows:**
- ✅ Polite thank you message
- ✅ Explanation of what we focus on
- ✅ Suggest DIY resources if appropriate
- ✅ Website link only
- ⛔ NO contact info
- ⛔ NO PDF
- ⛔ NO recommendations

**Follow-up:** None (but data still captured for analytics)

---

## Outcome Pages & PDF Generation

### Hot Lead Outcome Page

**Header:**
```
"Great News, [Name]! 🎉"
"We Can Help You [solve their challenge]"
```

**Content Sections:**
1. **Your Answers Summary** (quick recap in cards)
2. **Recommended Services:**
   - Based on Q1 (content type)
   - Show relevant sample
   - Estimated timeline: "2-4 weeks"
   - Pricing range: "Right-sized for quality"
3. **Why This Works for You:**
   - Address their specific challenge (Q2)
   - Show relevant case study
   - Highlight "3 B's"
4. **Next Steps:**
   - ✅ Download your personalized report (PDF)
   - ✅ Book a 30-min discovery call (Calendly)
   - ✅ Email us at hello@designxfactor.com
5. **Contact Card:**
   - Your name & title
   - Email (clickable)
   - Calendly embed or link
   - Office hours if applicable

**PDF Content:**
- DXF logo (white background)
- Black header bar: "Your Custom Learning Experience Plan"
- Personalized greeting
- Service recommendations
- Timeline & process overview
- Contact information
- QR code linking back to website

---

### Warm Lead Outcome Page

**Header:**
```
"Thanks for Your Interest, [Name]!"
"Let's Stay Connected"
```

**Content:**
1. Your answers summary
2. Recommended services (educational focus)
3. Case studies relevant to their needs
4. Portfolio samples they can explore
5. "When You're Ready" section:
   - Timeline for decision-making
   - What to prepare before starting
   - Email contact only
6. Newsletter signup (if you have one)

**PDF:** Similar to hot lead but with educational focus, no direct booking CTA

---

## Design System Integration

### Colors (Match Current Site)
- **Background:** `#050508` (space black)
- **Hot/Ready:** `#ff4d6d` (brand-red) - for CTAs
- **Warm:** `#f59e0b` (gold) - for nurture
- **Cool:** `#38bdf8` (electric blue) - for education
- **Not Fit:** `#64748b` (gray) - neutral

### Typography
- Headlines: Inter Black (900)
- Body: Inter Regular (400)
- Match existing site styles

### Components to Reuse
- Button styles from current site
- Card components
- Input field styles
- Progress indicator (5 questions = 5 dots)

---

## Technical Implementation

### Tech Stack (Match Current Site)
- React + TypeScript
- React Router for multi-page flow
- Framer Motion for transitions (like UCF)
- Tailwind CSS (via CDN)
- Lucide React icons

### State Management
- React Context for form data
- sessionStorage for persistence
- Final submission to backend API

### Backend Requirements
- API endpoint: `POST /api/leadgen`
- Database table (similar to UCF):
  ```sql
  - id, timestamp
  - contact: name, email, company, role
  - answers: content_type, challenge, location, org_type, readiness
  - computed: outcome, recommended_services, score
  - metadata: referrer, user_agent, ip
  ```
- Email notification on hot leads
- PDF generation (similar to UCF approach)

### Form Validation
- Required field checking
- Email validation
- Progress saving (sessionStorage)
- Can resume if they refresh

---

## Differences from UCF BIP Model

| Aspect | UCF BIP | Design X Factor |
|--------|---------|-----------------|
| **Video Placement** | None (just stats) | Hero video on landing (30-60s) |
| **Questions** | 4 questions | 5 questions (added service type) |
| **Lead Categories** | 3 (Fit Ready, Fit Not Ready, Not Fit) | 4 (Hot, Warm, Nurture, Not Fit) |
| **PDF for All?** | Yes (except Not Fit) | Only Hot & Warm get PDF |
| **Program Matching** | Multiple programs | Service recommendations |
| **Industry Focus** | Startups & businesses | Training/education buyers |

---

## Content Differentiation Strategy

Based on your pamphlet image, you're positioning against:

1. **DIY with Tools** - People think Canva + ChatGPT = designer
2. **Template Shops** - Cookie-cutter solutions
3. **Enterprise Agencies** - Slow & expensive

**Your Questions Should Reveal:**
- Are they looking for tools? (Not a fit)
- Do they understand the value of design? (Warm vs Hot)
- Do they have realistic timeline/budget? (Hot vs Nurture)
- Do they have content ready? (Readiness indicator)

**Messaging Throughout:**
- "Having tools doesn't make you a designer"
- "We design for YOUR audience, not templates"
- "Weeks, not months"
- "Bueno, Bonito, Barato"

---

## QR Code Strategy

### For Conference Booths

**Printed Materials:**
1. **Table Tent Card:**
   ```
   [DXF Logo]

   "See What We Can Build for YOU"
   [QR Code]

   Scan for:
   ✓ 60-second demo
   ✓ Custom recommendations
   ✓ Instant pricing estimate

   2 minutes • Mobile-friendly
   ```

2. **Flyer/Handout:**
   - Front: Problem/solution (your pamphlet design)
   - Back: QR code + "Get Your Custom Plan"

### URL Structure
- Main: `designxfactor.com/start`
- With tracking: `designxfactor.com/start?ref=conference_name`
- Example: `designxfactor.com/start?ref=atd2026`

---

## Success Metrics

### Track These KPIs

1. **Conversion Funnel:**
   - QR scans → Landing views
   - Landing → Contact form (watch video completion)
   - Contact → Questions started
   - Questions → Completed
   - Completed → Outcome viewed
   - Hot leads → Calendly booked

2. **Lead Quality:**
   - % Hot vs Warm vs Nurture vs Not Fit
   - Time to completion (target: 2-3 min)
   - Drop-off points (optimize those pages)

3. **Outcome Actions:**
   - PDF downloads
   - Calendly bookings (hot leads)
   - Email clicks (warm leads)

---

## Next Steps

1. **Review & Approve** this proposal
2. **Provide Inputs:**
   - Do you have a 30-60 second video? Or should we plan a script?
   - Calendly link for booking
   - Any specific disqualifiers I should add?
   - Target conferences where this will be used?
3. **Build Phase:**
   - Create components
   - Implement routing & state management
   - Build outcome logic
   - PDF generation setup
   - Email notifications
4. **Test:**
   - Mobile optimization (QR code entry)
   - Different screen sizes
   - Form validation
   - All outcome paths
5. **Deploy:**
   - Cloudflare Pages (existing infrastructure)
   - Set up tracking/analytics
   - Generate QR codes

---

## Estimated Timeline

- **Design/Planning:** Already done (this proposal)
- **Development:** 3-4 days
  - Day 1: Landing + Contact pages
  - Day 2: Questions page + state management
  - Day 3: Outcome logic + pages
  - Day 4: PDF generation + testing
- **Testing & Refinement:** 1 day
- **Total:** ~1 week

---

## Questions for You

1. **Video:** Do you have existing video content, or do we need to create a script?
2. **Contact Info:** What contact methods should hot leads see?
   - Email: hello@designxfactor.com (confirmed)
   - Phone number?
   - Calendly link?
3. **Lead Routing:** Should hot leads go to a specific person/team?
4. **Disqualifiers:** Any automatic "not a fit" criteria?
   - Budget thresholds?
   - Geographic restrictions?
   - Service types you DON'T offer?
5. **PDF Delivery:** Should PDFs include pricing? Or just "contact us for quote"?
6. **Branding:** Any conference-specific branding needed? (e.g., "As seen at ATD 2026")

---

## Example Question Screens (Mockup Text)

### Landing Page
```
[VIDEO PLAYER - 30-60 seconds]

Most Training Delivers Information.
We Create Experiences.

In 2 minutes, discover what we can build for you.

[Button: Start Your Project Discovery →]

Trusted by organizations that care about engagement
WCAG 2.1 AA Compliant • 2-4 Week Delivery • Bueno, Bonito, Barato
```

### Question 3 Example
```
Progress: ●●●○○

Question 3 of 5

Where is your organization based?

[Option Cards in Grid:]
🇺🇸 United States
🌍 International (English content)
🌎 International (Multi-language needs)

[Button: Continue →]
[Link: ← Back]
```

### Hot Lead Outcome
```
Great News, Sarah! 🎉

Based on your answers, we can help you create engaging
video lessons that actually land.

━━━━━━━━━━━━━━━━━━━━━

YOUR ANSWERS
[3 cards showing their top answers]

RECOMMENDED FOR YOU
🎥 Video Production + Accessibility
✓ Captions & transcripts included
✓ LMS-ready formats
✓ Timeline: 2-3 weeks
✓ ADA compliant from day one

WHY THIS WORKS
Your challenge: "Low completion rates"
Our approach: We design for engagement first...
[Case study card]

NEXT STEPS
1. 📥 Download your personalized plan (PDF)
2. 📅 Book a 30-minute discovery call
3. 📧 Email us at hello@designxfactor.com

[Big Button: Schedule Your Discovery Call →]
[Secondary Button: Download PDF Report]

━━━━━━━━━━━━━━━━━━━━━

CONTACT
Email: hello@designxfactor.com
[Calendly embed]

We typically respond within 24 hours.
```

---

**Ready to proceed?** Let me know your feedback and answers to the questions above, and I'll start building this out!
