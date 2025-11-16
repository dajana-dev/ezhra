import { useState } from 'react';
import '../styles/Toolbar.scss';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Toolbar = () => {

  const [searchTerm, setSearchterm] = useState(null);

  const onSubmitSearchTerm = (e) => {
    setSearchterm(e.target.value);
  }

  return (
    <div className="toolbar">
      <Link to="/JobDetails/new">Create</Link>
      <div className="tools">
        <SearchBar/>
        <div className="filer">Filter</div>
      </div>
    </div>
  );
};

export default Toolbar;
