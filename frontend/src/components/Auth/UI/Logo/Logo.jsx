import "./Logo.css";
import { FaWallet } from "react-icons/fa";

function Logo({ size = "large" }) {
  return (
    <div className={`logo logo-${size}`}>
      <div className="logo-icon">
        <FaWallet />
      </div>

      <div className="logo-text">
        <h2>Financial Habit Builder</h2>
        <p>Build Wealth. Build Better Habits.</p>
      </div>
    </div>
  );
}

export default Logo;