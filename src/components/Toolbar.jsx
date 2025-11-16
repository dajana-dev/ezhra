import { useState } from 'react';
import '../styles/Toolbar.scss';
import { Link } from 'react-router-dom';

const Toolbar = () => {

  return (
    <div className="toolbar">
      <Link to="/JobDetails/new">Create</Link>
      <div className="tools">
        <div className="searchbar">Search</div>
        <div className="filer">Filter</div>
      </div>
    </div>
  );
};

export default Toolbar;
