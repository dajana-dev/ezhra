import { useModal } from "../store/modalStore";
import classes from "../styles/Modal.module.scss"
import Button from "./Button";
import { useTheme } from "../store/themeStore";

const Modal = () => {
    const {isOpen, message, closeModal, confirmDelete} = useModal();
    const {theme} = useTheme.getState();

    
    if(!isOpen) return null;

    return (
        <div className={classes.backdrop} onClick={closeModal}>
        <div className={`${classes.modal} ${theme === 'light' ? classes['light-theme'] : classes['dark-theme']}`} onClick={(e)=>{e.stopPropagation()}}> {/*{theme === 'light' ? style="background-color:$pure-white;" : style="background-color:$dark-theme-bg;"}*/}
            <h4>{message}</h4>
            <div className={classes['modal-buttons']}>
                <Button variant="deleteModal" onClick={confirmDelete}>Delete</Button>
                <Button variant="primary" onClick={closeModal}>Cancel</Button>
            </div>
        </div>
        </div>
    );
}
 
export default Modal;