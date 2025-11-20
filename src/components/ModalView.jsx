import { useEffect, useState } from "react";

export default function ModalView({ children, intendedToClose, handleModalReset }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      animateModalClose();
    }
  }

  useEffect(() => {
    if (intendedToClose) {
      animateModalClose();
    }
  }, [intendedToClose]);

  const animateModalClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      handleModalReset();
    }, 200);
  }

  return (
    <div 
      className={`modal-backdrop ${isAnimating ? 'closing' : ''}`}
      style={styles.modalBackdrop}
      onClick={handleBackdropClick}
    >
      <div 
        className="modal-view"
        style={styles.modalContent}
      >
        {children}
      </div>
    </div>
  )
}

const styles = {
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 20,
  }
}