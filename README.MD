<h1 align="center">🚀 Suraj's Digital Space</h1>
<p align="center"><i>A full-stack personal platform combining blogging, portfolio, and interactive features</i></p>

<div align="center">
    <a href="https://github.com/surajrimal07/surajrimal.dev"><img src="https://img.shields.io/badge/version-2.5.1-blue?style=for-the-badge" alt="Version"/></a>
    <a href="https://www.surajrimal.dev"><img src="https://img.shields.io/badge/website-live-brightgreen?style=for-the-badge" alt="Website"/></a>
    <br />
    <a href="https://github.com/surajrimal07/surajrimal.dev/blob/main/LICENSE"><img src="https://img.shields.io/github/license/surajrimal07/surajrimal.dev?style=flat-square" alt="License"/></a>
    <a href="https://github.com/surajrimal07/surajrimal.dev/stargazers"><img src="https://img.shields.io/github/stars/surajrimal07/surajrimal.dev?style=flat-square" alt="Stars"/></a>
    <a href="https://github.com/surajrimal07/surajrimal.dev/network/members"><img src="https://img.shields.io/github/forks/surajrimal07/surajrimal.dev?style=flat-square" alt="Forks"/></a>
    <a href="https://github.com/surajrimal07/surajrimal.dev/issues"><img src="https://img.shields.io/github/issues/surajrimal07/surajrimal.dev?style=flat-square" alt="Issues"/></a>
</div>

<div align="center">
    <h3>🛠️ Built With</h3>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js"/>
    <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" alt="React"/>
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Tailwind-3-blue?style=flat-square&logo=tailwindcss" alt="Tailwind"/>
    <img src="https://img.shields.io/badge/Supabase-latest-green?style=flat-square&logo=supabase" alt="Supabase"/>
    <img src="https://img.shields.io/badge/Upstash-Redis-red?style=flat-square&logo=redis" alt="Upstash Redis"/>
</div>

## 🌟 Features

### 💻 Core Platform
- **Next.js 15** with App Router and Server Components
- **Supabase** for Authentication, Database, and Storage
- **Upstash Redis** for Caching and Rate Limiting
- **shadcn/ui** for Beautiful UI Components
- **Framer Motion** for Smooth Animations
- **Zustand** for State Management
- **MDX** for Rich Content
- **Cookie Consent** Management

### 🤖 AI Integration
```bash
# Required AI Configuration
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
OPENAI_BASE_URL=your_openai_base_url
OPENAI_API_KEY=your_openai_api_key
```
- AI-powered chatbot trained on personal data
- Vector search for content discovery
- Real-time chat monitoring via Telegram/Admin
- Intelligent response system

### 📝 Content & Interaction
- **Admin Panel** for all content management
- **WalineJS** comment system with reactions
- Interactive Guestbook
- Code Snippets with reactions
- Contact form with availability status
- Page view analytics
- GitHub contribution map
- Private code contribution tracking

### 👤 User Features
- Supabase Authentication
- Personal profiles
- Activity tracking
- Reaction history
- Comment management

### 📊 Analytics & Tracking
- Page views & visitor stats
- User engagement metrics
- Content performance
- Availability status
- Work proposal system

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/surajrimal07/surajrimal.dev.git

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Ingest content to vector DB
npm run ingest-content

# Start development
npm run dev
```

## 📑 Content Management

### Admin Dashboard Features
- Blog post creation/editing
- Media management
- Live chat monitoring
- User management
- Analytics dashboard
- Comment moderation
- Availability settings
- Proposal management

### Vector Database Content
```bash
# Update vector database
npm run ingest-content
```
Processes:
- Blog posts
- Projects
- Technologies
- Experience
- Certifications

## 🔒 Security & Privacy

- Cookie consent management
- Terms and conditions customization
- Privacy policy templates
- Data protection measures
- User data management

## 🎨 Sections

### Main Features
- 📚 Blog with reactions
- 💻 Code snippets
- ✍️ Guestbook
- 🛠️ Technologies showcase
- 📈 GitHub activity
- 🎓 Certifications
- 📅 Availability calendar
- 📞 Contact system

### Interactive Elements
- Real-time chat
- Comment system
- Reaction system
- Guest book entries
- Work proposals
- Contact form

## 🛠️ Development

```bash
# Run tests
npm run test

# Build production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## ⚙️ Environment Setup

```env
# Core
NEXT_PUBLIC_SITE_URL=
DATABASE_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Redis
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

# AI Integration
QDRANT_URL=
QDRANT_API_KEY=
OPENAI_BASE_URL=
OPENAI_API_KEY=

# Optional
NEXT_PUBLIC_GA_TRACKING_ID=
```

## 📝 Important Notes

- Customize Terms & Conditions
- Update Privacy Policy
- Configure Cookie Consent
- Set up Availability Status
- Customize Contact Forms

## 🤝 Contributing

Contributions are welcome! Please check the [Contributing Guide](CONTRIBUTING.md).

## 📸 Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: [Lucide](https://lucide.dev)
- Illustrations: [Storyset](https://storyset.com)

---

<p align="center">
    Built with ❤️ by <b>Suraj Rimal</b> 👋<br>
    This blog was heavily inspired by <a href="https://karhdo-blog.vercel.app">Karhdo's Blog</a> (<a href="https://github.com/Karhdo/karhdo.dev">GitHub</a>). Special thanks to <a href="https://github.com/timlrx/tailwind-nextjs-starter-blog">Timothy Lin</a> for the original template.<br>
    <a href="https://www.surajrimal.dev">www.surajrimal.dev</a>
</p>
