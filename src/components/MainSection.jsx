import "../styles/MainSection.scss";
import Toolbar from "./Toolbar";

const MainSection = ({children}) => {
    return ( 
        <main className="main-main-section">
            <Toolbar />
            {children}
        </main>
     );
}
 
export default MainSection;