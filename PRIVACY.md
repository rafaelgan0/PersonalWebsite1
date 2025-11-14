# 🔒 Privacy & Security Guide

## What's Protected

This portfolio follows security best practices by **NOT** exposing sensitive personal information publicly.

### ❌ NOT Displayed Publicly
- **Phone Number** - Never display this on public websites
- **Email Address** - Not shown directly (use contact form instead)

### ✅ Safe to Display
- **LinkedIn** - Professional networking profile
- **GitHub** - Professional code portfolio
- **Location** - City/state only (not full address)
- **Name** - Professional name

---

## 📧 Email Strategy

### Current Setup (Recommended for Public Sites)
- Email is **only** used internally for the contact form
- Users can't scrape your email from the HTML
- Contact happens through the form → LinkedIn → email chain

### Option 1: Keep Form Only (Most Private) ⭐
**Current implementation** - Users fill out form, you get notified via your chosen method.

**Pros:**
- No email exposure
- No spam
- Professional appearance

**Cons:**
- Need to connect to a backend service (FormSpree, EmailJS, etc.)

### Option 2: Professional Email Domain
If you want to show an email, use:
- `contact@rafaelgan.com` instead of personal Gmail
- Custom domain looks more professional
- Can forward to personal email
- Easy to disable if spam increases

### Option 3: Email Obfuscation (Mild Protection)
Display as: `rafael [at] example [dot] com`
- Stops basic bots
- Still publicly visible
- Not recommended for GitHub repos

---

## 🚫 What NOT to Commit to GitHub

### Never Commit:
- Phone numbers
- Personal email addresses (use environment variables)
- Home addresses
- Social security numbers
- API keys or passwords
- Any PII (Personally Identifiable Information)

### Safe to Commit:
- LinkedIn profile URL
- GitHub profile URL
- Professional website URL
- City/state location
- Professional accomplishments

---

## 🔧 How to Use Environment Variables

For truly sensitive data, use environment variables:

1. Create `.env.local` (already gitignored):
```env
CONTACT_EMAIL=your-private-email@gmail.com
PHONE_NUMBER=+1-xxx-xxx-xxxx
```

2. Use in code:
```typescript
// Never exposed to client
const privateEmail = process.env.CONTACT_EMAIL;
```

3. Add to `.env.example` (template for others):
```env
CONTACT_EMAIL=your-email@example.com
```

---

## 🌐 Deployment Considerations

### Vercel Deployment
- Add environment variables in Vercel dashboard
- They're encrypted and never exposed in build logs
- Perfect for API keys and private data

### Public Repository
- **Your current approach is perfect** ✅
- Email is in code but not displayed
- Consider moving to env vars later if connecting real backend

---

## 📞 When to Share Phone Number

**Only share your phone:**
- In direct messages to recruiters
- During interview scheduling
- On your actual resume PDF (not in code)
- When filling out job applications

**Never:**
- On public GitHub repos
- On public portfolio websites
- In commit messages
- In code comments

---

## ✅ Current Privacy Status

Your portfolio is now **properly secured**:
- ✅ No phone number in code or display
- ✅ Email not displayed publicly
- ✅ Contact form encourages professional communication
- ✅ LinkedIn and GitHub safely displayed
- ✅ Git history clean of sensitive data

---

## 🚀 Next Steps (Optional)

To connect the contact form to actually send emails:

### Option A: FormSpree (Easiest)
```typescript
// Free tier: 50 submissions/month
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option B: EmailJS (Free & Popular)
- 200 emails/month free
- No backend needed
- Easy React integration

### Option C: Send Using Next.js API Route
- Create `/api/contact` route
- Use services like SendGrid, Mailgun, or Resend
- Most control but requires setup

---

**Remember:** Your privacy is worth protecting. When in doubt, don't expose it! 🔐

