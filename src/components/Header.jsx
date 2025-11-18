import { Link } from "react-router-dom";
import "../styles/Header.scss"
import userIcon from '../assets/user.svg'
import { useTheme } from "../store/themeStore";
import Button from "./Button";

const Header = () => {

    const {theme, toggleTheme} = useTheme();

    return ( 
        <header className="header-header">
            <div className="logo-container">
                {/* <img src="" alt="ezhra-logo" /> */}
                <Link to={"/"} className="logo"><h2>Ezhra</h2></Link>
            </div>
            <div className="right">
                <Button onClick={toggleTheme} variant="toggleTheme">Toggle {theme === 'dark' ? 'light' : 'dark'} theme</Button>
                <div className="account">
                <img src={userIcon} alt="User Icon" />
                </div>
            </div>
        </header>
     );
}
 
export default Header;