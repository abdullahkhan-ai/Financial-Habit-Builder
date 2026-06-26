import "./AuthBanner.css";
import { FaWallet } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import { HiTrendingUp } from "react-icons/hi";

function AuthBanner() {
  return (
    <div className="auth-banner">

      <div className="logo-circle">
        <FaWallet />
      </div>

      <h1>Financial Habit Builder</h1>

      <p>
        Build Better Habits.
        <br />
        Build Long-Term Wealth.
      </p>

      <div className="feature-card">
        <HiTrendingUp />
        <span>Track your expenses</span>
      </div>

      <div className="feature-card">
        <MdSavings />
        <span>Achieve savings goals</span>
      </div>

      <div className="feature-card">
        <FaWallet />
        <span>Manage your finances</span>
      </div>

    </div>
  );
}

export default AuthBanner;