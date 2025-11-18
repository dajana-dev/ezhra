import '../styles/Toolbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import UnemployedFilter from './UnemployedFilter';
import Button from './Button';

const Toolbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <div className="toolbar">
      {isHomePage ? (
        <>
        <Link to="/JobDetails/new" className='link button'>Create</Link>
      <div className="tools">
        <SearchBar/>
        <UnemployedFilter/>
      </div>
        </>
      ) : (
        <Button onClick={() => navigate("/")}>Back</Button>
      )}
      
    </div>
  );
};

export default Toolbar;
