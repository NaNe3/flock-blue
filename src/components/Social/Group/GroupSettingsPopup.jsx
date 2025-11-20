import { constants } from "../../../utility/colors";

import { useModal } from "../../../context/ModalProvider";

import GroupDeleteModal from "./GroupDeleteModal";
import GroupEditModal from "./GroupEditModal";
import PopupView from "../../PopupView";

export default function GroupSettingsPopup({
  visible,
  setVisible,
  groupId,
}) {
  const { handleModalOpen } = useModal();

  const handleSetVisible = (newValue) => {
    setVisible(prev => ({ settings: newValue, ...prev.member }))
  }

  const handleRevealModal = (modalContent) => {
    const content = {
      'edit-group': <GroupEditModal groupId={groupId} />,
      'delete-group': <GroupDeleteModal groupId={groupId} />,
    }

    handleModalOpen({ content: content[modalContent] })
    handleSetVisible(false)
  }

  return (
    <PopupView
      visible={visible}
      setVisible={handleSetVisible}
      style={styles.popup}
    >
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleRevealModal('edit-group')}
      >
        <p style={styles.popupText}>Edit group</p>
      </div>
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleRevealModal('delete-group')}
      >
        <p style={{ ...styles.popupText, color: constants.red }}>Delete group</p>
      </div>
    </PopupView>
  )
}

const styles = {
  popup: {
    width: 260,

    bottom: -110,
    left: -220,
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