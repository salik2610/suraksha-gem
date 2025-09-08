# Suraksha - AI Railway Safety Module

A modern React-based railway safety management system built with Vite, featuring real-time monitoring, collision avoidance, and AI-powered track detection.

## 🚄 Features

- **Real-time Dashboard**: Live metrics and system status monitoring
- **Collision Avoidance**: Interactive train proximity monitoring with emergency simulation
- **AI Track Detection**: Image analysis for track defects and obstacles
- **Alert Management**: Comprehensive alert system with filtering and response actions
- **Master Control Panel**: System controls and manual overrides

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: CSS3 with Custom Properties
- **Icons**: Lucide React
- **Development**: ESLint, Hot Module Replacement

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd suraksha-railway-safety
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the project root with:
   ```bash
   VITE_PPLX_API_KEY=your_perplexity_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Application header
│   ├── Navigation.jsx  # Tab navigation
│   ├── Dashboard.jsx   # Main dashboard
│   ├── CollisionAvoidance.jsx
│   ├── TrackDetection.jsx
│   ├── AlertManagement.jsx
│   └── Controller.jsx
├── hooks/              # Custom React hooks
│   └── useAppData.js   # Application state management
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and design system
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Palette**: Indian Railways themed with blue/indigo primary colors
- **Typography**: Poppins font family with responsive scaling
- **Components**: Reusable card, button, and form components
- **Animations**: CSS animations and transitions
- **Responsive Design**: Mobile-first approach with breakpoints

## 🔧 Key Features

### Real-time Updates
- Live metrics updates every 3 seconds
- Dynamic train position tracking
- Random alert generation
- System status monitoring

### Interactive Simulations
- Collision scenario simulation
- Emergency brake activation
- AI image analysis simulation
- Track defect detection

### State Management
- Custom React hooks for data management
- Real-time state updates
- Persistent application state
- Efficient re-rendering

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: 480px and below
- Tablet: 768px and below
- Desktop: 1024px and above
- Large Desktop: 1280px and above

## 🔒 Security Features

- Input validation
- XSS protection
- Secure file upload handling
- Error boundary implementation

## 🚀 Performance Optimizations

- Code splitting with Vite
- Efficient React rendering
- Optimized CSS animations
- Lazy loading components
- Bundle size optimization

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Suraksha** - Ensuring Railway Safety Through AI Technology
