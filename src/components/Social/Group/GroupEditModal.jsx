import { useMemo, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CameraAiIcon } from "@hugeicons-pro/core-solid-rounded"

import { updateGroupName } from "../../../utility/db-groups"

import BasicButton from "../../BasicButton"
import Avatar from "../../Avatar"

import { useHolos } from "../../../context/HolosProvider"
import { useModal } from "../../../context/ModalProvider"

export default function GroupEditModal({ groupId }) {
  const { groups, setGroups } = useHolos()
  const { handleModalClose } = useModal()
  
  const group = useMemo(() => groups.find(g => g.group_id === groupId), [groups, groupId])

  const initialGroupName = useRef(group.group_name).current
  const [input, setInput] = useState(initialGroupName)
  const [loading, setLoading] = useState(false)

  const handleGroupNameUpdate = async () => {
    setLoading(true)
    const { data, error } = await updateGroupName({
      group_id: groupId,
      new_name: input.trim(),
    })

    if (error) {
      console.error('Error updating group name:', error)
      return
    }
  
    setGroups(prev => prev.map(group => {
      if (group.group_id === groupId) {
        return {
          ...group,
          group_name: data.group_name,
        }
      }
      return group
    }))

    setLoading(false)
    handleModalClose()
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.avatarContainer}>
        <Avatar
          imagePath={group?.group_image}
          style={styles.avatar}
        />
        <div style={styles.avatarOverlay}>
          <HugeiconsIcon
            icon={CameraAiIcon}
            size={28}
            color="#fff"
          />
        </div>
      </div>
      <textarea
        type="text"
        placeholder={initialGroupName}
        style={styles.input}

        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
      />
      <div style={styles.button}>
        <BasicButton
          text="update"
          disabled={input.trim().length === 0 || input === initialGroupName || input.length > 70}
          onClick={handleGroupNameUpdate}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: 600,
    height: 500,

    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    padding: 30
  },

  avatarContainer: {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',

    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  avatar: {
    flex: 1,
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    opacity: 0.8,
    cursor: 'pointer',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    border: 'none',
    outline: 'none',

    fontSize: 28,
    fontWeight: 700,
  
    resize: 'none',
    borderRadius: 10,
    padding: 10,
  },

  button: {
    marginTop: 80,
    width: 200
  },
}