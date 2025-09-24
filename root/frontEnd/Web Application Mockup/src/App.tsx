import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { LandingPage } from "./components/LandingPage";
import { SpendingDashboard } from "./components/SpendingDashboard";
import { AddExpensePage } from "./components/AddExpensePage";
import { SettleUpPage } from "./components/SettleUpPage";
import { SendReminderPage } from "./components/SendReminderPage";
import { ViewHistoryPage } from "./components/ViewHistoryPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("landing");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  switch (currentPage) {
    case "spending":
      return <SpendingDashboard onNavigate={handleNavigation} />;
    case "add-expense":
      return <AddExpensePage onNavigate={handleNavigation} />;
    case "settle-up":
      return <SettleUpPage onNavigate={handleNavigation} />;
    case "send-reminder":
      return <SendReminderPage onNavigate={handleNavigation} />;
    case "view-history":
      return <ViewHistoryPage onNavigate={handleNavigation} />;
    case "landing":
    default:
      return <LandingPage onNavigate={handleNavigation} />;
  }
}