import Avatar from "../../Avatar";
import OutlineButton from "../../OutlineButton";

export default function InvitePersonRow({ 
  person,
  isPending, 
  isMember,

  handleInviteUser,
}) {
  const handleInviteButtonPress = () => {
    handleInviteUser(person.id);
  }

  return (
    <div 
      key={`search-person-${person.id}`}
      style={styles.contentRow}
    >
      <Avatar
        imagePath={person.avatar_path}
        style={styles.avatar}
      />
      <p style={styles.contentName}>{person.full_name}</p>
      <OutlineButton
        text={isMember ? 'MEMBER' : 'INVITE'} 
        onClick={handleInviteButtonPress}
        disabled={isPending || isMember}
      />
    </div>
  )
}

const styles = {
  contentRow: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  avatar: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
  contentName: {
    display: 'flex',
    flex: 1,
    color: '#aaa',
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'center',
  },
}