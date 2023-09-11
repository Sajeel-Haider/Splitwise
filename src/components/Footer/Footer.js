import footertheme from "../../assets/footer-theme.png";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <img src={footertheme} alt="footertheme" />
      </div>
    </div>
  );
};
