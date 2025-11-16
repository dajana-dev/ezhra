import { useModal } from "../store/modalStore";
import "../styles/Modal.scss"

const Modal = () => {
    const {isOpen, message, closeModal, confirmDelete} = useModal();
    
    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e)=>{e.stopPropagation()}}>
            <h4>{message}</h4>
            <div className="modal-buttons">
                <button className="delete" onClick={confirmDelete}>Delete</button>
                <button className="cancel" onClick={closeModal}>Cancel</button>
            </div>
        </div>
        </div>
    );
}
 
export default Modal;