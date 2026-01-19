import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareIcon } from "@hugeicons-pro/core-solid-rounded";

import AddGroupByCodeModal from "./AddGroupByCodeModal";
import AuxiliaryColumn from "../AuxiliaryColumn";
import GroupListView from "../GroupListView";
import SearchBar from "../SearchBar";

import { useTheme } from "../../context/ThemeProvider";
import { useModal } from "../../context/ModalProvider";
import { useFont } from "../../context/FontProvider";
import { useMemo } from "react";

export default function SocialLeftColumn() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { handleModalOpen } = useModal()

  const handleGroupAdd = () => {
    handleModalOpen({
      content: <AddGroupByCodeModal />,
    });
  }

  return (
    <AuxiliaryColumn>
      <div style={styles.actionContainer}>
        <SearchBar placeholder="Search groups or friends" />
        <div 
          style={styles.actionRow}
          onClick={handleGroupAdd}
        >
          <HugeiconsIcon
            icon={AddSquareIcon}
            size={24}
            color={theme.tertiaryText}
          />
          <p style={styles.actionText}>Add group by code</p>
        </div>
      </div>

      <div style={styles.contentColumnContainer}>
        <p style={styles.contentHeader}>Groups</p>
        <GroupListView />
      </div>

      {/* <div style={styles.contentColumnContainer}>
        <p style={styles.contentHeader}>Friends</p>
        {friends.map((friend) => (
          <div 
            className="hover-background"
            key={`relationship-${friend.id}`}
            style={styles.contentRow}
            onClick={() => handleFriendClick({ friendId: friend.id })}
          >
            <Avatar
              imagePath={friend.avatar_path}
              style={styles.avatar}
            />
            <p style={styles.contentName}>{friend.full_name}</p>
          </div>
        ))}
      </div> */}
    </AuxiliaryColumn>
  )
}

const style = (theme, font) => ({
  contentHeader: {
    fontSize: 18,
    color: theme.actionText,
    ...font.bold,
    
    padding: '15px 25px',
  },

  actionContainer: {
    flexDirection: 'column',
    display: 'flex',
    gap: 10,

    padding: '0 15px'
  },
  actionRow: {
    flexDirection: 'row',
    display: 'flex',
    gap: 10,
    cursor: 'pointer',

    backgroundColor: theme.secondaryBackground,
    padding: 10,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 16,
    alignSelf: 'center',
    color: theme.tertiaryText,
    ...font.regular
  },

  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: theme.primaryText,
    fontSize: 16,
    fontWeight: 700,
  },
})
