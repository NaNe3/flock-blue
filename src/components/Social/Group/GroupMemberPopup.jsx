import PopupView from "../../PopupView";

export default function GroupMemberPopup({
  visible,
  setVisible,
}) {
  return (
    <PopupView
      visible={visible}
      setVisible={setVisible}
      style={styles.popup}
    >
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleNavigate('/profile') }
      >
        <p style={styles.popupText}>Kick</p>
      </div>
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleNavigate('/profile') }
      >
        <p style={styles.popupText}>Report member</p>
      </div>
    </PopupView>
  )
}

const styles = {
  popup: {
    width: 250,

    bottom: 0,
    left: -270,
  },

  popupRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: '12px 20px',
    cursor: 'pointer',
  },
  popupText: {
    fontSize: 16,
    fontWeight: 800,
    color: '#eee',
  }
}