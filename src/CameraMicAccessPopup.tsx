import React from 'react';
import Modal from 'react-modal';
import micCamIcon from '../src/assests/_7bd0d0f7-e5f0-4b08-a549-25cf12a78a90 1 (1) 1.png';
import pageInfoIcon from '../src/assests/Group 51304.png'; 
import styles from './CameraMicAccessPopup.module.css'; 

Modal.setAppElement('body');

interface CameraMicAccessPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CameraMicAccessPopup: React.FC<CameraMicAccessPopupProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Mic and Camera Permission"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.popup}>
        <h2>Mic and Camera Access</h2>
        <div className={styles['popup-body']}>
          <img
            src={micCamIcon}
            alt="Mic and Camera Icon"
            className={styles.icon}
          />
          <div className={styles.text}>
            <p>StorkyApp is blocked from using your camera or microphone.</p>
            <ol>
              <li>
                Click the 
                <img src={pageInfoIcon} alt="Page Info Icon" className={styles.info} /> 
                page info icon in your browser’s address bar.
              </li>
              <li>Turn on camera and microphone.</li>
            </ol>
          </div>
        </div>
        <button className={styles.actionButton} onClick={onRequestClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CameraMicAccessPopup;
