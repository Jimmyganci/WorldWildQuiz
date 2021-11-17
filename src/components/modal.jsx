import { PropTypes } from 'prop-types';
import './modal.css';

const Modal = ({ children, openModal, hideModal }) => {
  return (
    <div
      className="modalBackground"
      role="button"
      aria-hidden="true"
      onClick={() => hideModal()}
    >
      <div className={openModal ? 'modalContainer' : 'modalContainer isHidden'}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Modal;
