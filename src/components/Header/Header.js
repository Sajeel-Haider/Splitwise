import plane from "../../assets/plane.png";
import { BlockButton } from "../StyledComponents/Button-styles";
import homeData from "../../staticData/home.json";
import "./Header.scss";

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1>{homeData.title}</h1>
        <p>{homeData.subtitle1}</p>
        <p>{homeData.subtitle2}</p>
        <BlockButton variant="block" to="/signup">
          Sign up
        </BlockButton>
      </div>
      <div>
        <img src={plane} alt="plane" />
      </div>
    </div>
  );
};
