# BreakEven

BreakEven is a modern React application designed to simplify bill splitting and expense management among friends, roommates, and groups. With an intuitive interface and powerful features, it helps users track shared expenses, calculate balances, and settle debts effortlessly.

## Features

- **Interactive Welcome Animation**: Engaging scroll-based animation that visually demonstrates bill splitting
- **User Authentication**: Secure login and signup functionality
- **Dashboard Overview**: Real-time balance tracking with net owed/owing amounts
- **Transaction Management**:
  - View unsettled transactions with filtering (all, owed to you, you owe, individual, group)
  - Detailed transaction history with participant information
- **Expense Tracking**:
  - Add new expenses with custom details
  - Support for both individual and group expenses
- **Settlement Tools**:
  - Settle up with individuals or groups
  - Send payment reminders
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for typography
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Testing**: Jest with React Testing Library
- **Build Tool**: Create React App

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd breakeven-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`.

## Usage

1. **Welcome Page**: Scroll through the animated bill-splitting demonstration and click "Try it out" to begin.

2. **Authentication**: Sign up for a new account or log in to an existing one.

3. **Dashboard**: View your current balances and unsettled transactions. Use filters to organize your view.

4. **Add Expense**: Record new shared expenses with details like amount, description, and participants.

5. **Settle Up**: Mark debts as settled when payments are made.

6. **Send Reminders**: Notify others about outstanding payments.

7. **View History**: Review past transactions and settlements.

## Project Structure

```
breakeven-app/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # Search engine crawling rules
├── src/
│   ├── components/         # React components
│   │   ├── AddExpensePage.tsx
│   │   ├── landingpage.tsx
│   │   ├── loginpage.tsx
│   │   ├── SettleUpPage.tsx
│   │   ├── SendReminderPage.tsx
│   │   ├── signuppage.tsx
│   │   ├── ViewHistoryPage.tsx
│   │   └── welcome_animation.tsx
│   ├── lib/                # Utility functions
│   │   ├── use-mobile.ts
│   │   └── utils.ts
│   ├── pages/              # Page components (if any)
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── App.css             # Global styles and font definitions
│   ├── App.js              # Main app component with routing
│   ├── App.test.js         # App component tests
│   ├── index.css           # Base styles
│   ├── index.js            # App entry point
│   ├── reportWebVitals.js  # Performance monitoring
│   └── setupTests.js       # Test configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects from Create React App (irreversible)

## Testing

Run the test suite with:
```bash
npm test
```

Tests are written using Jest and React Testing Library.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
