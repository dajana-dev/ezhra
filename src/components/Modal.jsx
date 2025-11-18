import { useModal } from "../store/modalStore";
import "../styles/Modal.scss"
import Button from "./Button";

const Modal = () => {
    const {isOpen, message, closeModal, confirmDelete} = useModal();
    
    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e)=>{e.stopPropagation()}}>
            <h4>{message}</h4>
            <div className="modal-buttons">
                <Button variant="delete" onClick={confirmDelete}>Delete</Button>
                <Button variant="primary" onClick={closeModal}>Cancel</Button>
            </div>
        </div>
        </div>
    );
}
 
export default Modal;