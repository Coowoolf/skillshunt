<div align="center">

# 🎯 SkillsHunt

### The Product Hunt for AI Agent Skills

[![Live Demo](https://img.shields.io/badge/demo-skillshunt.org-orange?style=for-the-badge)](https://skillshunt.org)
[![GitHub Stars](https://img.shields.io/github/stars/Coowoolf/skillshunt?style=for-the-badge)](https://github.com/Coowoolf/skillshunt)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

**Discover, share, and explore AI Agent Skills for Claude Code, Codex, OpenCode and more.**

[🌐 Visit SkillsHunt](https://skillshunt.org) · [📊 SkillsBench Partnership](https://skillsbench.ai) · [🐛 Report Bug](https://github.com/Coowoolf/skillshunt/issues)

</div>

---

## 🤔 Why SkillsHunt?

AI coding agents are everywhere—Claude Code, Cursor, Windsurf, OpenCode, Codex—but finding the right **Skills** to supercharge your workflow is fragmented and painful.

**SkillsHunt solves this by providing:**

- 🔍 **One Place to Discover** – 35+ curated skills from Anthropic, Obra Superpowers, Composio, SkillsMP, and the community
- 📈 **Benchmark Tasks** – Real-world evaluation tasks from SkillsBench to test agent capabilities
- 🤝 **Community-Driven** – Vote, submit, and share skills with fellow developers
- ⚡ **Zero Friction** – Copy install commands, view GitHub sources, instant deployment

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Dopamine Geek Style** | Beautiful, modern UI with claymorphism and gradients |
| 🔍 **Smart Search** | Search by name, description, or tags |
| 📂 **Category Filters** | Development, Document, Testing, Benchmarks, and more |
| 👍 **Upvote System** | Vote for your favorite skills (persisted locally) |
| 📝 **Submit Skills** | Share your own skills with the community |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🗂️ Skills Sources

SkillsHunt aggregates skills from multiple sources:

| Source | Count | Type |
|--------|-------|------|
| 🤖 **Anthropic** | 5 | Official Claude Code skills |
| ⚡ **Obra Superpowers** | 5 | Development workflow skills |
| 🔗 **Composio** | 4 | Awesome skills collection |
| 📦 **SkillsMP** | 6 | Community marketplace |
| 📊 **SkillsBench** | 14 | Benchmark evaluation tasks |
| 👥 **Community** | 1+ | User submissions |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Coowoolf/skillshunt.git
cd skillshunt

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Deployment**: Vercel
- **Design System**: Custom "Dopamine Geek Style"

---

## 📁 Project Structure

```
skillshunt/
├── app/
│   ├── page.tsx              # Homepage with skills grid
│   ├── layout.tsx            # Root layout with Header/Footer
│   └── skills/[slug]/        # Dynamic skill detail pages
├── components/
│   ├── ui/                   # SkillCard, SearchBar, FloatingShapes, etc.
│   └── layout/               # Header, Footer
├── data/
│   └── skills.ts             # Skills database (35+ skills)
└── public/                   # Static assets
```

---

## 🤝 Contributing

We welcome contributions! Here are some ways to help:

1. **Submit a Skill** – Use the "Submit Skill" button on the website
2. **Report Issues** – Found a bug? [Open an issue](https://github.com/Coowoolf/skillshunt/issues)
3. **Pull Requests** – Improvements to code, UI, or documentation

---

## 🔗 Related Projects

- [SkillsBench](https://skillsbench.ai) – Benchmark evaluation framework for AI agent skills
- [SkillsMP](https://skillsmp.com) – Agent Skills Marketplace
- [Obra Superpowers](https://github.com/obra/superpowers) – Development workflow skills
- [Anthropic Skills](https://github.com/anthropics/skills) – Official Claude Code skills

---

## 📝 Roadmap

- [ ] User authentication (GitHub OAuth)
- [ ] Backend integration (Supabase)
- [ ] Skill submission review system
- [ ] Performance benchmarks integration
- [ ] API for skill discovery

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

<div align="center">

**Built with 🎯 by the AI Agent community**

[⭐ Star this repo](https://github.com/Coowoolf/skillshunt) if you find it useful!

</div>
