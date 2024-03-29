// components/Modal.tsx
import React, { useState } from 'react';
import styles from './Modal.module.css'; // Assume CSS module for styling

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiveTask: () => void; // Function to call when receiving the task
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onReceiveTask, children }) => {
    const [isReceived, setIsReceived] = useState(false);

    const handleReceiveTask = () => {
        onReceiveTask();
        setIsReceived(true); // Update state to show success message
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                {children}
                {!isReceived ? (
                    // Show "Receive Task" button if task hasn't been received yet
                    <button className={styles.receiveButton} onClick={handleReceiveTask}>Receive Task</button>
                ) : (
                    // Show success message if task has been received
                    <p>Receive succeeded!</p>
                )}
                {/* Close modal button */}
                <button className={styles.closeModalButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
