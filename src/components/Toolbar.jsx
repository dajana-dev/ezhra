import { useState } from 'react';
import '../styles/Toolbar.scss';
import JobForm from './JobForm';

const Toolbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);

  const discardForm = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="toolbar">
      {isOpenModal && <JobForm closeForm={discardForm} />}
      <button onClick={openModal}>Create</button>

      <div className="tools">
        <div className="searchbar">Search</div>
        <div className="filer">Filter</div>
      </div>
    </div>
  );
};

export default Toolbar;
