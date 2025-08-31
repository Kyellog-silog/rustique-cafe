# ☕ Rustique Café

<div align="center">
  <img src="public/rustique-logo.png" alt="Rustique Café Logo" width="200" />
  
  **A Modern Coffee Shop Experience**
  
  🌐 **[Live Demo](https://rustique-cafe.vercel.app)** 🌐
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com/)
  [![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://rustique-cafe.vercel.app)
</div>

## 📖 About

Rustique Café is a modern, full-stack web application for a coffee shop featuring a beautiful user interface, comprehensive menu management, and advanced admin capabilities. Built with cutting-edge technologies to deliver an exceptional digital café experience.

## ✨ Features

### 🏠 **Customer Experience**
- **Beautiful Landing Page** - Elegant hero section with smooth animations
- **Interactive Menu** - Browse coffee, pastries, and seasonal specialties
- **Smart Search & Filtering** - Find items by name, description, or category
- **Shopping Cart** - Add items, adjust quantities, and manage orders
- **Responsive Design** - Optimized for all devices and screen sizes
- **Coffee-Themed UI** - Rich gradients and patterns inspired by coffee aesthetics

### 👨‍💼 **Admin Dashboard**
- **Menu Management** - Create, edit, and delete menu items
- **Category Management** - Organize products with dynamic categories
- **Image Upload** - Drag-and-drop image uploads with preview
- **Sales Analytics** - Track orders, revenue, and popular items
- **Advanced Navigation** - Collapsible sidebar with intuitive organization
- **Real-time Updates** - Live data synchronization across all pages

> **📝 Demo Note:** The admin dashboard is accessible from the home page for demonstration purposes, allowing visitors to explore the complete management interface and UI/UX design. In a production environment, this would be protected behind proper authentication and authorization.

### 🔐 **Authentication & Security**
- **Supabase Auth** - Secure user authentication system
- **Row Level Security** - Database-level security policies
- **Protected Routes** - Admin-only access to management features
- **Session Management** - Persistent login state across sessions

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - Latest React with Concurrent Features
- **[TypeScript](https://typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://radix-ui.com/)** - Accessible component primitives
- **[Lucide Icons](https://lucide.dev/)** - Beautiful, customizable icons

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
- **[PostgreSQL](https://postgresql.org/)** - Robust relational database
- **[Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)** - Database security policies

### **Development Tools**
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[React Dropzone](https://react-dropzone.js.org/)** - Drag-and-drop file uploads
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- **Supabase Account** for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rustique-cafe.git
   cd rustique-cafe
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**
   
   Run the SQL scripts in the `scripts/` directory:
   ```bash
   # Execute in Supabase SQL Editor or via CLI
   psql -f scripts/001_create_menu_items.sql
   psql -f scripts/002_fix_rls_policies.sql
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
rustique-cafe/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── menu/              # Public menu page
│   └── about/             # About page
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Base UI components
│   └── ...               # Feature components
├── lib/                  # Utilities and configurations
│   ├── api/              # API client functions
│   ├── supabase/         # Supabase client setup
│   └── types/            # TypeScript definitions
├── public/               # Static assets
├── scripts/              # Database migration scripts
└── styles/               # Global styles
```

## 🗄️ Database Schema

### **Core Tables**
- **`categories`** - Menu item categories (Beverages, Pastries, etc.)
- **`menu_items`** - Product catalog with pricing and descriptions
- **`orders`** - Customer order records
- **`order_items`** - Individual items within orders

### **Key Features**
- **Row Level Security** - User-based data access control
- **Foreign Key Relationships** - Normalized data structure
- **Automatic Timestamps** - Created/updated tracking

## 🎨 Design System

### **Color Palette**
- **Espresso** - Deep brown primary color
- **Mocha** - Medium brown secondary
- **Latte** - Light brown tertiary
- **Cream** - Warm off-white background

### **Typography**
- **Headings** - Serif fonts for elegance
- **Body Text** - Clean sans-serif for readability
- **Accent Text** - Coffee-inspired color variations

### **Components**
- **Consistent Spacing** - Tailwind spacing scale
- **Rounded Corners** - Soft, approachable feel
- **Subtle Shadows** - Depth and elevation
- **Smooth Animations** - Polished interactions

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](https://github.com/user-attachments/assets/39076fea-f6cd-4678-bfb7-dad8a90e971c)
<img width="1862" height="1000" alt="image" src="https://github.com/user-attachments/assets/1ffb75e5-1cd8-4541-9b8a-30545e65c336" />
<img width="1863" height="1002" alt="image" src="https://github.com/user-attachments/assets/2f85464c-40ca-49fc-98b3-c82fd40f10dc" />
<img width="1867" height="1005" alt="image" src="https://github.com/user-attachments/assets/6943b08e-0b44-4af9-bdc3-e8b1cfd34bec" />


### 📋 Menu Page
![Menu Page](https://github.com/user-attachments/assets/3dff0d18-fdb9-4c27-bbfe-5d1c59d76409)

### ℹ️ About Page
![About Page](https://github.com/user-attachments/assets/e03e22df-154f-483c-b80f-44b9448d606a)

### 👨‍💼 Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/0e367e7f-5994-42d0-8fda-7561b00647e1)
<img width="1873" height="995" alt="image" src="https://github.com/user-attachments/assets/d5a34951-cd26-4b52-8f11-67283da7935c" />
<img width="1861" height="1001" alt="image" src="https://github.com/user-attachments/assets/51220ebb-0837-41b0-b8c4-0125b8aef0a9" />
<img width="1862" height="1003" alt="image" src="https://github.com/user-attachments/assets/9fc19816-364f-42f2-93ce-2df7b8e3c3ba" />



## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
pnpm db:reset     # Reset database (if configured)
pnpm db:seed      # Seed with sample data
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### **Other Platforms**
- **Netlify** - Static site deployment
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - Component library inspiration
- **[Supabase](https://supabase.com/)** - Excellent backend platform
- **[Vercel](https://vercel.com/)** - Seamless deployment experience
- **Coffee Community** - For inspiring this digital café experience

## 📞 Support

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Community Q&A and ideas
- **Email** - contact@rustiquecafe.com (if applicable)

---

<div align="center">
  <p><strong>Built with ☕ and ❤️</strong></p>
  <p>© 2025 Rustique Café. All rights reserved.</p>
</div>
