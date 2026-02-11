# Learning Log Buddy - Frontend

> A modern, responsive web application for tracking learning activities, visualizing progress, and maintaining learning streaks built with React, Vite, and TailwindCSS.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Components Architecture](#components-architecture)
- [State Management](#state-management)
- [Styling & Theming](#styling--theming)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

Learning Log Buddy Frontend is a comprehensive single-page application that enables users to:
- Track daily learning activities across customizable categories
- Monitor progress with interactive streak tracking and gamification
- Visualize learning patterns with charts and analytics
- Focus with an integrated Pomodoro timer
- Set and track weekly learning goals
- Review historical learning data

Built with modern React patterns, TypeScript-ready architecture, and a mobile-first responsive design philosophy.

---

## ✨ Features

### Core Functionality
- 📊 **Dashboard** - Real-time overview with streaks, weekly progress, and charts
- 📝 **Activity Logging** - Quick entry form with time presets
- ⏱️ **Pomodoro Timer** - Configurable focus timer with automatic logging
- 📅 **History View** - Chronological activity browser with date filtering
- 🎯 **Goal Tracking** - Visual progress indicators for learning targets
- 🏷️ **Category Management** - Custom categories with icons and colors
- 🔥 **Streak System** - Gamified daily streak with milestone animations

### User Experience
- 🌓 **Dark/Light Mode** - System-aware theme switching
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ⚡ **Instant Feedback** - Toast notifications for all actions
- 🎨 **Custom Theming** - HSL-based color system with CSS variables
- 🔄 **Real-time Updates** - React Query cache invalidation
- 🎭 **Loading States** - Skeleton screens and spinners
- ♿ **Accessible** - ARIA labels and keyboard navigation

### Technical Features
- JWT-based authentication with auto-refresh
- Protected routes with redirect handling
- Axios interceptors for token management
- React Query for server state caching
- Optimistic UI updates
- Error boundary implementation
- Code splitting and lazy loading

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **UI Library** | React 18.3.1 |
| **Build Tool** | Vite 5.4.19 |
| **Styling** | TailwindCSS 3.4.17 |
| **Routing** | React Router DOM 6.30.1 |
| **Data Fetching** | TanStack Query 5.83.0 |
| **HTTP Client** | Axios 1.6.0 |
| **UI Components** | Radix UI Primitives |
| **Component Library** | shadcn/ui |
| **Charts** | Recharts 2.15.4 |
| **Icons** | Lucide React 0.462.0 |
| **Theme** | next-themes 0.3.0 |
| **Notifications** | Sonner 1.7.4 |
| **Utilities** | class-variance-authority, clsx, tailwind-merge |

---

## 📁 Project Structure

```
client/
├── public/                          # Static assets
│   ├── favicon.ico                 # App favicon
│   └── placeholder.svg             # Placeholder images
│
├── src/                            # Source code
│   ├── components/                 # React components
│   │   ├── auth/                  # ✅ Authentication components
│   │   │   ├── LoginForm.jsx      # Login form with validation
│   │   │   ├── RegisterForm.jsx   # Registration form
│   │   │   └── ProtectedRoute.jsx # Route guard wrapper
│   │   │
│   │   ├── dashboard/             # ✅ Dashboard widgets
│   │   │   ├── StreakDisplay.jsx  # Streak counter with animations
│   │   │   ├── WeeklyProgress.jsx # Progress bars for goals
│   │   │   ├── WeeklyChart.jsx    # Bar chart visualization
│   │   │   ├── CategoryBreakdown.jsx # Pie chart breakdown
│   │   │   ├── TodaySummary.jsx   # Today's activity list
│   │   │   └── GoalProgress.jsx   # Long-term goal cards
│   │   │
│   │   ├── layout/                # ✅ Layout components
│   │   │   └── AppLayout.jsx      # Main app shell with navigation
│   │   │
│   │   ├── log/                   # ✅ Activity logging
│   │   │   └── LogForm.jsx        # Activity entry form
│   │   │
│   │   ├── settings/              # ✅ Settings & customization
│   │   │   └── CategoryManager.jsx # Category CRUD interface
│   │   │
│   │   ├── ui/                    # ✅ Reusable UI components (shadcn/ui)
│   │   │   ├── button.jsx         # Button variants
│   │   │   ├── card.jsx           # Card container
│   │   │   ├── dialog.jsx         # Modal dialogs
│   │   │   ├── dropdown-menu.jsx  # Dropdown menus
│   │   │   ├── input.jsx          # Form inputs
│   │   │   ├── label.jsx          # Form labels
│   │   │   ├── progress.jsx       # Progress bars
│   │   │   ├── select.jsx         # Select dropdowns
│   │   │   ├── sonner.jsx         # Toast wrapper
│   │   │   ├── toast.jsx          # Toast component
│   │   │   ├── toaster.jsx        # Toast container
│   │   │   └── tooltip.jsx        # Tooltips
│   │   │
│   │   ├── NavLink.jsx            # Active navigation link
│   │   └── ThemeToggle.jsx        # Dark/light mode toggle
│   │
│   ├── context/                    # ✅ React Context providers
│   │   └── AuthContext.jsx        # Authentication state & methods
│   │
│   ├── hooks/                      # ✅ Custom React hooks
│   │   ├── useAuth.js             # Auth context consumer
│   │   ├── useCategories.js       # Category queries & mutations
│   │   ├── useStats.js            # Statistics queries
│   │   ├── useActivities.js       # Activity queries & mutations
│   │   ├── useMobile.js           # Mobile breakpoint detection
│   │   └── useToast.js            # Toast notification hook
│   │
│   ├── lib/                        # ✅ Utilities and helpers
│   │   ├── api.js                 # Axios instance with interceptors
│   │   ├── utils.js               # Utility functions (cn, formatters)
│   │   └── constants.js           # App constants and defaults
│   │
│   ├── pages/                      # ✅ Page components (routes)
│   │   ├── Index.jsx              # Dashboard page
│   │   ├── Log.jsx                # Activity logging page
│   │   ├── Pomodoro.jsx           # Pomodoro timer page
│   │   ├── History.jsx            # Activity history page
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   └── NotFound.jsx           # 404 page
│   │
│   ├── App.jsx                     # Main app component with providers
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles & Tailwind directives
│
├── .env                            # Environment variables
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML template
├── package.json                    # Project dependencies
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build configuration
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm, npm, or yarn package manager
- Backend API running (see [backend repository](link-to-backend))
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-log-buddy/client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

The app will start at `http://localhost:5173`

### Quick Test

```bash
# Open browser to
http://localhost:5173

# You should see the login page
# Register a new account to test the app
```

---

## 🔧 Environment Variables

Create a `.env` file in the client root directory:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional: Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=false
```

### Environment Variable Details

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | http://localhost:5000/api | **Yes** |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | false | No |
| `VITE_ENABLE_NOTIFICATIONS` | Enable push notifications | false | No |

**Note:** Vite exposes environment variables to your app by prefixing them with `VITE_`. Access them via `import.meta.env.VITE_*`.

---

## 🗺️ Pages & Routes

### Public Routes
```javascript
/login              # User login page
/register           # User registration page
```

### Protected Routes (Require Authentication)
```javascript
/                   # Dashboard - Overview with stats and charts
/log                # Activity Logging - Quick entry form
/pomodoro           # Focus Timer - Pomodoro with auto-logging
/history            # Activity History - Chronological view
```

### Route Configuration

Routes are defined in `App.jsx`:

```jsx
<Routes>
  {/* Public Routes */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  
  {/* Protected Routes */}
  <Route path="/" element={
    <ProtectedRoute>
      <AppLayout><Index /></AppLayout>
    </ProtectedRoute>
  } />
  
  {/* 404 Fallback */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🏗️ Components Architecture

### Component Hierarchy

```
App
├── BrowserRouter
│   ├── LoginPage (public)
│   ├── RegisterPage (public)
│   └── ProtectedRoute
│       └── AppLayout
│           ├── Header
│           │   ├── Navigation
│           │   ├── CategorySettings
│           │   ├── ThemeToggle
│           │   └── LogoutButton
│           ├── MainContent
│           │   └── [Page Component]
│           └── MobileNav
```

### Component Categories

#### Layout Components (`components/layout/`)
- `AppLayout.jsx` - Main application shell with header and navigation

#### Page Components (`pages/`)
- `Index.jsx` - Dashboard with all widgets
- `Log.jsx` - Activity logging form
- `Pomodoro.jsx` - Focus timer interface
- `History.jsx` - Activity history browser
- `Login.jsx` - Authentication form
- `Register.jsx` - User registration form

#### Dashboard Widgets (`components/dashboard/`)
- `StreakDisplay.jsx` - Current/longest streak with fire emoji
- `WeeklyProgress.jsx` - Progress bars for active days and hours
- `WeeklyChart.jsx` - Stacked bar chart for weekly breakdown
- `CategoryBreakdown.jsx` - Pie chart of time distribution
- `TodaySummary.jsx` - List of today's activities
- `GoalProgress.jsx` - Cards showing long-term progress

#### Shared Components (`components/ui/`)
All UI components follow shadcn/ui patterns with:
- Consistent API using Radix UI primitives
- Tailwind CSS styling
- Variant support via class-variance-authority
- Full TypeScript support (ready)

---

## 🔄 State Management

### Authentication State
Managed by `AuthContext`:
```javascript
{
  user: Object | null,      // Current user data
  loading: Boolean,         // Initial load state
  login: Function,          // Login method
  register: Function,       // Registration method
  logout: Function          // Logout method
}
```

### Server State
Managed by TanStack Query:
```javascript
// Query Keys
['categories']              // User categories
['activities', date]        // Activities for specific date
['stats', 'dashboard']      // Dashboard statistics
['stats', 'weekly']         // Weekly breakdown
['targets']                 // User goal targets
```

### Local State
- Component-level state with `useState`
- Form state in page components
- UI state (modals, dropdowns) in components

### Data Flow

```
API Request → Axios Interceptor (add token) 
  → Server Response → React Query Cache 
  → Component Re-render → UI Update
```

---

## 🎨 Styling & Theming

### Design System

#### Color Palette
```css
/* Light Mode */
--background: 210 40% 98%;
--foreground: 222 47% 11%;
--primary: 217 91% 50%;

/* Dark Mode */
--background: 222 47% 6%;
--foreground: 210 40% 98%;
--primary: 217 91% 60%;
```

#### Typography
- Font Family: System UI stack
- Font Sizes: Tailwind default scale
- Line Heights: 1.5 (body), 1.2 (headings)

#### Spacing
- Container Padding: 1rem (mobile), 2rem (desktop)
- Component Gaps: 0.25rem to 2rem
- Border Radius: 0.75rem (default)

### Theme Switching

Implemented with `next-themes`:
```jsx
const { theme, setTheme } = useTheme();

// Toggle theme
setTheme(theme === 'dark' ? 'light' : 'dark');
```

### Responsive Breakpoints
```javascript
sm: '640px'   // Tablets
md: '768px'   // Small laptops
lg: '1024px'  // Desktops
xl: '1280px'  // Large screens
2xl: '1400px' // Extra large screens
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server with HMR
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Lint code (if configured)
pnpm lint

# Format code (if configured)
pnpm format
```

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   pnpm dev
   # Test in browser at http://localhost:5173
   ```

3. **Build and verify**
   ```bash
   pnpm build
   pnpm preview
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: description of your feature"
   git push origin feature/your-feature-name
   ```

5. **Create pull request**

### Code Style Guidelines

- Use **functional components** with hooks (no class components)
- Prefer **named exports** for components
- Use **arrow functions** for component definitions
- Keep components **small and focused** (<200 lines)
- Extract repeated JSX into components
- Use **destructuring** for props
- Add **PropTypes** or TypeScript types (recommended)
- Use **semantic HTML** elements
- Follow **accessibility** best practices

### Component Template

```jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MyComponent({ className, ...props }) {
  const [state, setState] = useState(initialValue);

  const handleAction = () => {
    // Handle action
  };

  return (
    <div className={cn('base-classes', className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### Custom Hooks Pattern

```javascript
export function useCustomHook() {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return {
    data: state,
    actions: { /* ... */ }
  };
}
```

---

## 🧪 Testing

### Test Structure (Planned)

```
tests/
├── unit/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/
│   └── pages/
└── e2e/
    └── user-flows/
```

### Testing Stack (Recommended)

- **Unit Tests:** Vitest
- **Component Tests:** React Testing Library
- **E2E Tests:** Playwright or Cypress
- **Coverage:** Vitest Coverage

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test -- MyComponent.test.jsx

# Run with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Update `VITE_API_URL` to production API
- [ ] Test production build locally (`pnpm build && pnpm preview`)
- [ ] Optimize images and assets
- [ ] Enable error tracking (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics, Plausible)
- [ ] Set up monitoring and alerts
- [ ] Configure CDN for static assets
- [ ] Enable compression (Brotli/Gzip)
- [ ] Test on multiple devices and browsers
- [ ] Set up CI/CD pipeline

### Build Output

```bash
pnpm build

# Output in dist/ directory:
dist/
├── assets/
│   ├── index-[hash].js    # Main bundle
│   ├── vendor-[hash].js   # Dependencies
│   └── index-[hash].css   # Compiled styles
├── index.html
└── favicon.ico
```

### Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Configuration (`vercel.json`):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_API_URL": "@production-api-url"
  }
}
```

#### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Configuration (`netlify.toml`):**
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Option 3: Static Hosting (AWS S3, GitHub Pages)
1. Build the app: `pnpm build`
2. Upload `dist/` contents to hosting provider
3. Configure SPA routing (redirect all routes to index.html)
4. Set up HTTPS with SSL certificate

---

## 📊 Performance Optimization

### Implemented Optimizations
- ✅ Code splitting by route
- ✅ Lazy loading for heavy components
- ✅ React Query cache for reduced API calls
- ✅ Memoization with `useMemo` for expensive calculations
- ✅ Debounced inputs for search/filter
- ✅ Optimized bundle size with tree-shaking
- ✅ SVG icons instead of font icons

### Planned Optimizations
- [ ] Image lazy loading and optimization
- [ ] Service worker for offline support
- [ ] Virtual scrolling for long lists
- [ ] Bundle size monitoring
- [ ] Lighthouse score optimization
- [ ] Web vitals tracking

### Performance Metrics (Target)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Score: >90
- Bundle Size: <500KB (gzipped)

---

## 🔒 Security

### Implemented Security Measures
- ✅ JWT token stored in localStorage (consider httpOnly cookies)
- ✅ Automatic token refresh on API calls
- ✅ Protected routes with authentication check
- ✅ Input sanitization for user data
- ✅ HTTPS enforcement in production
- ✅ CSP headers configuration
- ✅ XSS protection via React's escaping

### Security Best Practices
- Never store sensitive data in localStorage
- Validate all user inputs on frontend
- Use HTTPS for all API communication
- Implement rate limiting on forms
- Keep dependencies updated
- Audit npm packages regularly

---

## 🐛 Troubleshooting

### Common Issues

**Vite Dev Server Won't Start**
```
Error: Port 5173 is already in use
```
- Kill the process: `lsof -ti:5173 | xargs kill` (Mac/Linux)
- Or change port in `vite.config.js`: `server: { port: 3000 }`

**API Connection Failed**
```
Error: Network Error
```
- Ensure backend is running on correct port
- Check `VITE_API_URL` in `.env`
- Verify CORS settings on backend

**Authentication Errors**
```
401 Unauthorized
```
- Clear localStorage: `localStorage.clear()`
- Re-login to get fresh token
- Check JWT_SECRET matches backend

**Build Errors**
```
Error: Failed to resolve import
```
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check import paths use `@/` alias

**Styling Issues**
```
Tailwind classes not working
```
- Restart dev server (HMR can fail for Tailwind)
- Check `tailwind.config.js` content paths
- Verify PostCSS configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add user profile page
fix: Resolve login redirect bug
docs: Update README installation steps
style: Format code with Prettier
refactor: Extract common button logic
test: Add tests for activity logging
chore: Update dependencies
```

### Pull Request Guidelines

- **Title:** Clear, descriptive summary
- **Description:** Explain what and why
- **Screenshots:** For UI changes
- **Tests:** Ensure all tests pass
- **Documentation:** Update relevant docs
- **Code Style:** Follow project conventions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Recharts](https://recharts.org/) - Composable charting library
- [Lucide](https://lucide.dev/) - Beautiful icon set
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] User authentication
- [x] Activity logging
- [x] Dashboard with statistics
- [x] Category management
- [x] Pomodoro timer

### Phase 2: Enhanced Features 🚧
- [ ] Activity search and filtering
- [ ] Data export (CSV/JSON)
- [ ] Email notifications
- [ ] Calendar view
- [ ] Mobile app (React Native)

### Phase 3: Advanced Features 📋
- [ ] AI-powered activity suggestions
- [ ] Social features and sharing
- [ ] Team/group tracking
- [ ] Integration with learning platforms
- [ ] Browser extension
- [ ] Desktop app (Electron)

---

## 📈 Project Status

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** February 2026

### Progress Tracker

| Feature | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Dashboard | ✅ Complete |
| Activity Logging | ✅ Complete |
| Pomodoro Timer | ✅ Complete |
| Category Management | ✅ Complete |
| History View | ✅ Complete |
| Dark Mode | ✅ Complete |
| Responsive Design | ✅ Complete |
| Testing | 📋 Planned |
| E2E Tests | 📋 Planned |

---

**Built with ❤️ using React, Vite, and TailwindCSS**