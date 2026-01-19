import AddGroupByCodeModal from "../Social/AddGroupByCodeModal";

import { useModal } from "../../context/ModalProvider";

export default function GroupCodePrompt() {
  const { handleModalOpen } = useModal()

  const handleGroupAddPress = () => {
    handleModalOpen({ content: <AddGroupByCodeModal /> })
  }

  return (
    <div style={styles.groupListHeader}>
      <h3 style={styles.title}>Have a group code?</h3>
      <p style={styles.subtitle}>Click here to search for the group. crazy study adventures await!</p>
      <button
        style={styles.addGroupButton}
        onClick={handleGroupAddPress}
        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        <span style={styles.addGroupButtonText}>enter code</span>
      </button>
    </div>
  )
}

const styles = {
  groupListHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',

    borderRadius: '15px',
    backgroundColor: '#2a2a2a',
    padding: '20px',
  },
  titleContainer: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  title: {
    color: '#aaa',
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
  },
  subtitle: {
    color: '#888',
    fontSize: '14px',
    fontWeight: '700',
    
    marginBottom: '15px',
    margin: 0,
    marginBottom: '15px'
  },
  addGroupButton: {
    padding: '8px 12px',
    marginTop: '20px',
    borderRadius: '40px',
    border: `2px solid #555`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  addGroupButtonText: {
    color: '#aaa',
    fontSize: '16px',
    fontWeight: '700',
  },
}