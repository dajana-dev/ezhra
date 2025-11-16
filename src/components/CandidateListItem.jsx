import { useState, useRef } from 'react';
import '../styles/CandidateListItem.scss';

const CandidateListItem = ({ onSave, initialCandidate, editingId, setEditingId, handleOpenModal }) => {
  const [candidate, setCandidate] = useState(initialCandidate);
  const inputRefs = useRef([]);
  const [showError, setShowError] = useState(false);

  const { $id, serial, name, phone } = candidate;

  const inputs = [
    { name: 'serial', value: serial, autoFocus: true },
    { name: 'name', value: name },
    { name: 'phone', value: phone },
  ];

  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
    if (showError) {
      setShowError(false);
    }
  };

  const editModeOn = () => {
    setEditingId($id);
  };

  const editModeOff = () => {
    if (candidate.serial || candidate.name) {
      setEditingId(null);
      onSave(candidate);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handlePressEnter = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < inputs.length - 1) {
        inputRefs.current[index + 1]?.focus(); //focus the element that has index +1 (the next element) if it exists
      } else {
        editModeOff();
      }
    }
  };

  return (
    <li className={`candidate-item ${!editingId ? 'clickable' : ''}`} onClick={!editingId ? editModeOn : undefined} title={!editingId ? 'Click to edit' : ''}>
      <div className="inputs">
        {inputs.map((input, index) => (
          <div key={input.name} className={input.name}>
            {editingId ? (
              <input
                type="text"
                name={input.name}
                placeholder={input.name}
                value={input.value}
                onChange={handleChange}
                ref={(element) => (inputRefs.current[index] = element)} //element is the currently rendered DOM element while inputRefs.current is an array in which we are storing the current DOM element
                onKeyDown={(e) => handlePressEnter(e, index)}
                autoFocus={input.autoFocus}
              />
            ) : (
              input.value
            )}
          </div>
        ))}
      </div>
      {editingId && showError && <span className="error-bubble">Either name or serial must be filled</span>}
      <div className="buttons">{editingId && <button onClick={editModeOff}>Save</button>}
      <button onClick={(e) => handleOpenModal(e, $id)}>X</button>
      </div>
    </li>
  );
};

export default CandidateListItem;
