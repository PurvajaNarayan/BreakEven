import React, { useState } from 'react';
import './App.css';
import BillSplitSection from './components/welcome_animation';
import { LoginPage } from './components/loginpage';
import { LandingPage } from './components/landingpage';
import { AddExpensePage } from './components/AddExpensePage'; 
import { SettleUpPage } from './components/SettleUpPage';
import { SendReminderPage } from './components/SendReminderPage';
import { ViewHistoryPage } from './components/ViewHistoryPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); 

  const handleTryItOut = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setCurrentPage('dashboard'); // Set to dashboard after login
  };

  const handleBackToWelcome = () => {
    setShowLogin(false);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // You can add navigation logic here for different pages
    console.log(`Navigating to: ${page}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  // Show login page
  if (showLogin && !isLoggedIn) {
    return <LoginPage onLogin={handleLogin} onBack={handleBackToWelcome} />;
  }

  // Show landing page after login
  if (isLoggedIn) {
    if (currentPage === 'add-expense') {
      return <AddExpensePage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    if (currentPage === 'settle-up') {
      return <SettleUpPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    if (currentPage === 'send-reminder') {
      return <SendReminderPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    if (currentPage === 'view-history') {
      return <ViewHistoryPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    return <LandingPage onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  // Show welcome page by default
  return (
    <div>
      <BillSplitSection onTryItOut={handleTryItOut} />
    </div>
  );
}

export default App;