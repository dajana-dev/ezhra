import "../styles/Modal.scss"

const Modal = ({isModalOpen, handleCancelDelete, handleDelete, message}) => {
    if(!isModalOpen) return null;

    return (
        <div className="modal">
            <h4>{message}</h4>
            <div className="modal-buttons">
                <button className="delete" onClick={handleDelete}>Delete</button>
                <button className="cancel" onClick={handleCancelDelete}>Cancel</button>
            </div>
        </div>
    );
}
 
export default Modal;