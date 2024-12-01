<h1 align="center">Suraj's Personal Blog & Portfolio</h1>
<p align="center"><i>An interactive space where technology meets personalization - featuring AI-powered interactions and real-time engagement.</i></p>

<div align="center">
    <a href="https://github.com/surajrimal07/surajr.com.np/stargazers"><img src="https://img.shields.io/github/stars/surajrimal07/surajr.com.np" alt="Stars Badge"/></a>
    <a href="https://github.com/surajrimal07/surajr.com.np/network/members"><img src="https://img.shields.io/github/forks/surajrimal07/surajr.com.np" alt="Forks Badge"/></a>
    <a href="https://github.com/surajrimal07/surajr.com.np/pulls"><img src="https://img.shields.io/github/issues-pr/surajrimal07/surajr.com.np" alt="Pull Requests Badge"/></a>
    <a href="https://github.com/surajrimal07/surajr.com.np/issues"><img src="https://img.shields.io/github/issues/surajrimal07/surajr.com.np" alt="Issues Badge"/></a>
    <a href="https://github.com/surajrimal07/surajr.com.np/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/surajrimal07/surajr.com.np?color=2b9348"></a>
    <a href="https://github.com/surajrimal07/surajr.com.np/blob/master/LICENSE"><img src="https://img.shields.io/github/license/surajrimal07/surajr.com.np?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">
    <br>
    <a href="https://www.surajrimal.dev">
        <img src="https://img.shields.io/badge/🌐_Live_Demo-surajrimal.dev-2ea44f?style=for-the-badge" alt="Live Demo">
    </a>
</div>

## ✨ Features

### 🤖 AI-Powered Interaction

- **Smart Chatbot**: Personalized AI assistant trained on my experiences and knowledge
- **Vector Database**: Uses Qdrant for efficient similarity search of content
- **Real-time Chat**: Monitor and respond to visitors through Telegram or admin dashboard
- **Content Understanding**: OpenAI integration for intelligent responses

### 💬 Interactive Comments

- **[Waline](https://github.com/walinejs/waline) Integration**:
  - Emoji reactions
  - Nested comments
  - Markdown support
  - User avatars
  - Comment notifications
  - Multi-platform login

### 🎯 Core Features

- 🚀 Built with Next.js 15 & TypeScript
- 🎨 Beautiful UI with shadcn/ui components
- 🔐 Supabase Authentication & Storage
- 📝 Custom Admin Dashboard
- 🌓 Dark/Light mode
- 📱 Fully Responsive
- 🔄 Zustand State Management

## 🛠️ Tech Stack

[![Next][Next.js]][Next-url] [![MDX][MDX]][MDX-url] [![Vercel][Vercel]][Vercel-url] [![React][React]][React-url] [![Typescript][Typescript]][Typescript-url] [![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/surajrimal07/surajr.com.np.git

# Install dependencies
yarn install

# Setup environment variables
cp .env.example .env.local

# Required environment variables:
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
OPENAI_BASE_URL=your_openai_base_url
OPENAI_API_KEY=your_openai_api_key

# Ingest content into vector database
npm run ingest-content

# Start development server
npm run dev
```

## 📝 Content Management

### Vector Database Content Ingestion

```bash
# Ingest your content into Qdrant
npm run ingest-content
```

This command processes and stores:

- Blog posts
- Project details
- Personal information
- Professional experience
- Skills and expertise

### Admin Features

- Content management dashboard
- Real-time chat monitoring
- Comment moderation
- Analytics dashboard
- Media asset management

## 🤖 AI Chat Integration

The AI chatbot is trained on personal and professional information including:

- Work experience
- Technical skills
- Blog content
- Project details
- Common queries

Visitors can interact through:

- Website chat widget
- Telegram bot
- Admin dashboard

## 💭 Comments & Reactions

Powered by WalineJS, offering:

```js
{
  "features": [
    "Emoji reactions",
    "Nested comments",
    "Markdown support",
    "User avatars",
    "Real-time updates",
    "Spam protection",
    "Multi-language support"
  ]
}
```

## 🌟 Show Your Support

If you find this project interesting, please consider:

- Giving it a ⭐ on GitHub
- Sharing it with others
- Contributing to its improvement

## 📸 Image Credits

Assets sourced from:

- [Unsplash](https://unsplash.com/)
- [GIPHY](https://giphy.com/)
- [Storyset](https://storyset.com/)

---

<p align="center">Built with ❤️ by <b>Suraj Rimal</b></p>
<p align="center"><b>Copyright © 2024</b></p>

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind CSS-url]: https://tailwindcss.com/
[MDX]: https://img.shields.io/badge/MDX-000000?style=for-the-badge&logo=mdx&logoColor=white
[MDX-url]: https://mdxjs.com/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
