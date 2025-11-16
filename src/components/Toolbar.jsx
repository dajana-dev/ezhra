import '../styles/Toolbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import UnemployedFilter from './UnemployedFilter';

const Toolbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <div className="toolbar">
      {isHomePage ? (
        <>
        <Link to="/JobDetails/new">Create</Link>
      <div className="tools">
        <SearchBar/>
        <UnemployedFilter/>
      </div>
        </>
      ) : (
        <button onClick={() => navigate("/")}>Back</button>
      )}
      
    </div>
  );
};

export default Toolbar;
