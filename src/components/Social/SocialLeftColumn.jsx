import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareIcon, Search01Icon, Search01SolidRounded, Search02SolidRounded } from "@hugeicons-pro/core-solid-rounded";

import { useHolos } from "../../context/HolosProvider"

import AuxiliaryColumn from "../AuxiliaryColumn";
import Avatar from '../Avatar';
import SearchBar from "../SearchBar";

export default function SocialLeftColumn() {
  const { groups, friends } = useHolos()
  const navigate = useNavigate();

  const handleGroupClick = ({ groupId }) => {
    navigate(`/social/group/${groupId}`);
  }
  
  const handleFriendClick = ({ friendId }) => {
    navigate(`/social/profile/${friendId}`);
  }

  return (
    <AuxiliaryColumn>
      <div style={styles.actionContainer}>
        <SearchBar placeholder="Search groups or friends" />
        <div style={styles.actionRow}>
          <HugeiconsIcon
            icon={AddSquareIcon}
            size={24}
            color="#888"
          />
          <p style={styles.actionText}>Add group by code</p>
        </div>
      </div>

      <div style={styles.contentColumnContainer}>
        <p style={styles.contentHeader}>Groups</p>
        {groups.map((group) => (
          <div 
            className="hover-background"
            key={`group-${group.group_id}`}
            style={styles.contentRow}
            onClick={() => handleGroupClick({ groupId: group.group_id })}
          >
            <Avatar
              imagePath={group.group_image}
              style={styles.avatar}
            />
            <p style={styles.contentName}>{group.group_name}</p>
          </div>
        ))}
      </div>

      <div style={styles.contentColumnContainer}>
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
      </div>
    </AuxiliaryColumn>
  )
}

const styles = {
  contentHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 800,
    padding: '15px 25px',
  },

  contentColumnContainer: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
  },
  contentRow: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    padding: '10px 15px',
  },
  avatar: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
  contentName: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
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

    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 12,
  },
  actionText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
  },
}