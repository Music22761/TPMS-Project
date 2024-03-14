/* eslint-disable react/prop-types */
import style from "../../../css/style/model.module.css";

function Modal({ isOpen, handleClose, ...props }) {
  return (
    <>
      <div className={`${style.modalWrapper} ${isOpen ? style.modalOpen:''}`} onClick={handleClose}>
        <div className={style.modalContainer}>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Modal;
