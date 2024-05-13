import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const firstName = localStorage.getItem("fname");
  const lastName = localStorage.getItem("lname");
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            <div className="item">
            <span className="first-letter">
                  {capitalizeFirstLetter(firstName)}
                </span>{" "}
                <span className="last-name">
                  {capitalizeFirstLetter(lastName)}
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
