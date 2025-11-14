# 🍰 Personal Portfolio Website

A modern, dessert-themed personal portfolio website built with Next.js 15, TypeScript, and Framer Motion. Features smooth scroll animations, a beautiful macaron-inspired color palette, and fully responsive design.

## ✨ Features

- 🎨 **Dessert-Themed Design**: Latte background with macaron-inspired accents (pink, lavender, pistachio)
- 🎭 **Smooth Animations**: Powered by Framer Motion with fade-up, stagger, and floating animations
- 📱 **Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- 🚀 **Fast & Optimized**: Built with Next.js 15 App Router for optimal performance
- 💼 **Professional Sections**: Experience timeline, project showcase, skills, education, and contact
- 🎯 **SEO Friendly**: Proper meta tags and semantic HTML
- 🌙 **Modern UI**: Frosted glass cards, gradient text, and tasteful hover effects

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Inter & Playfair Display (Google Fonts)

## 📂 Project Structure

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Home page with hero
│   ├── experience/page.tsx       # Experience timeline
│   ├── projects/page.tsx         # Project showcase
│   ├── about/page.tsx            # About me & education
│   ├── contact/page.tsx          # Contact form
│   ├── resume/page.tsx           # Resume overview
│   └── globals.css               # Global styles & theme
├── components/
│   ├── Navigation.tsx            # Top navigation bar
│   ├── Footer.tsx                # Footer with links
│   └── animations/               # Reusable animation components
│       ├── FadeUp.tsx
│       ├── StaggerContainer.tsx
│       └── FloatingElement.tsx
├── lib/
│   ├── resume-data.ts            # Resume content & data
│   └── utils.ts                  # Utility functions
├── public/
│   ├── resume.pdf                # Downloadable resume
│   └── images/                   # Project images
├── tailwind.config.js            # Tailwind theme configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd PersonalWebsite
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### Update Personal Information

Edit `lib/resume-data.ts` to update:
- Personal info (name, role, tagline, contact)
- Work experience
- Projects
- Education
- Awards
- Skills

### Change Theme Colors

Edit `tailwind.config.js` to customize the dessert palette:
```javascript
colors: {
  latte: { ... },        // Background colors
  macaron: { ... },      // Accent colors
  chocolate: { ... },    // Text colors
}
```

### Add Your Resume PDF

Replace `public/resume.pdf` with your actual resume file.

### Add Project Images

1. Add images to `public/images/`
2. Update `image` property in project objects in `lib/resume-data.ts`

### Modify Animations

Edit animation components in `components/animations/` to customize:
- Animation durations
- Delay timings
- Easing functions
- Animation triggers

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your site is live with automatic deployments on push.

### Alternative Deployment Options

- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Use the Amplify Console
- **Docker**: Build and containerize the app
- **Self-hosted**: Run `npm run build` and `npm start`

### Environment Variables

If you add API integrations (e.g., contact form backend):

1. Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=your-api-url
   ```

2. Add to Vercel via Settings → Environment Variables

## 🎨 Theme Customization

### Color Palette

The dessert theme uses:
- **Latte** (`#f8f4ef`): Warm background
- **Macaron Pink** (`#ffb3d9`): Primary accent
- **Macaron Lavender** (`#c5b9e6`): Secondary accent
- **Macaron Pistachio** (`#b8d8ba`): Tertiary accent
- **Chocolate** (`#4b3427`): Text color

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌿 Git Branching Strategy

Suggested branch naming conventions:

- `feat/hero` - New feature: hero section
- `feat/projects-section` - New feature: projects
- `feat/experience-timeline` - New feature: experience
- `style/dessert-theming` - Style updates
- `fix/responsiveness` - Bug fixes
- `deploy/vercel` - Deployment changes
- `docs/readme` - Documentation updates

## 📦 Dependencies

### Production
- `next` - React framework
- `react` & `react-dom` - UI library
- `framer-motion` - Animation library
- `lucide-react` - Icon set
- `clsx` & `tailwind-merge` - Utility functions

### Development
- `typescript` - Type safety
- `tailwindcss` - Styling
- `eslint` - Code linting
- `autoprefixer` - CSS prefixing

## 🤝 Contributing

If you'd like to contribute or suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

Rafael Gan - [LinkedIn](https://linkedin.com/in/yourprofile) - [GitHub](https://github.com/yourprofile)

Project Link: [https://yourportfolio.vercel.app](https://yourportfolio.vercel.app)

---

Made with ❤️ and lots of desserts 🍰


