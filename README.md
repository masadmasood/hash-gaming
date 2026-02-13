# Hashtech Gaming

Premium pre-owned gaming gear in Pakistani

## About

Hashtech Gaming is an e-commerce platform specializing in high-quality, pre-owned gaming equipment. We offer a wide range of gaming peripherals, consoles, and accessories at competitive prices, ensuring gamers in Pakistan have access to top-tier gear without breaking the bank.

## Features

- **Product Catalog**: Browse through our extensive collection of gaming products
- **Product Details**: Detailed product pages with specifications and images
- **Shopping Cart**: Add items to cart and manage quantities
- **Checkout Process**: Secure checkout with order confirmation
- **Search Functionality**: Find products quickly with our search modal
- **Responsive Design**: Optimized for desktop and mobile devices
- **WhatsApp Integration**: Direct contact for customer support

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Context API
- **Routing**: React Router (assumed from project structure)
- **Testing**: Vitest
- **Package Manager**: npm/bun (lockfile present)

## Project Structure

```
src/
├── components/          # Reusable UI componentss
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components (Header, Footer, etc.)
├── pages/              # Page components
├── context/            # React contexts (CartContext)
├── data/               # Static data and configurations
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or bun

### Installation

```sh
# Install dependencies
npm install
# or
bun install
```

### Development

```sh
# Start development server
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

### Building

```sh
# Build for production
npm run build
# or
bun run build
```

### Testing

```sh
# Run tests once
npm run test
# or
bun run test

# Run tests in watch mode
npm run test:watch
# or
bun run test:watch
```

### Linting

```sh
# Run ESLint
npm run lint
# or
bun run lint
```

### Preview Production Build

```sh
# Preview the production build locally
npm run preview
# or
bun run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For inquiries about products or partnerships, reach out to us via WhatsApp or through our contact page.
