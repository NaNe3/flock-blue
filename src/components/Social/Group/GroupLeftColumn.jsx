import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuxiliaryColumn from "../../AuxiliaryColumn";
import SearchBar from "../../SearchBar";

import { getGroupsMembersByGroupId } from "../../../utility/db-groups";

import { useTheme } from "../../../context/ThemeProvider";
import { useCache } from "../../../context/CacheProvider";
import { useFont } from "../../../context/FontProvider";
import { useMedic } from "../../../context/MedicProvider";
import Avatar from "../../Avatar";
import Spinner from "../../Spinner";

export default function GroupLeftColumn({ group }) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const location = useLocation();

  const { handleCheckCache, handleUpdateCache } = useCache()
  const { publishError } = useMedic()
  const navigate = useNavigate();

  const [query, setQuery] = useState('')
  const [members, setMembers] = useState(group?.members || null)
  const filteredMembers = useMemo(() => {
    if (!members) return null;
    return members.filter((member) => {
      const fullName = member.full_name.toLowerCase();
      const searchQuery = query.toLowerCase();

      return fullName.includes(searchQuery);
    })
  }, [query, members])

  useEffect(() => {
    if (!group) return;

    const cachedMembers = handleCheckCache(`group_members_${group.group_id}`)
    if (cachedMembers) {
      setMembers(cachedMembers)
    } else {
      handleFetchGroupMembers(group.group_id)
    }
  }, [group])

  const handleFetchGroupMembers = async (groupId) => {
    const { data, error } = await getGroupsMembersByGroupId({ group_id: groupId })
    if (error) {
      publishError({
        message: 'There was an error loading the group members. Please try again later.',
        reason: error,
      })
    } else {
      handleUpdateCache(`group_members_${groupId}`, data)
      setMembers(data)
    }
  }

  const handleMemberClick = ({ memberId }) => {
    const currentPath = location.pathname;
    const isMemberPage = currentPath.includes('/member/');
    const newPath = `/group/${group.group_id}/member/${memberId}`;
    
    if (isMemberPage) {
      navigate(newPath, { replace: true });
    } else {
      navigate(newPath);
    }
  }

  return (
    <AuxiliaryColumn>
      <div style={styles.actionContainer}>
        <SearchBar 
          placeholder="Search groups members"
          query={query}
          setQuery={setQuery}
        />
      </div>

      {members ? (
        <div style={styles.contentColumnContainer}>
          <p style={styles.contentHeader}>{filteredMembers.length} Member{filteredMembers.length !== 1 && 's'}</p>
          {filteredMembers.map((member) => (
            <div 
              className="hover-background"
              key={`relationship-${member.group_member_id}`}
              style={styles.contentRow}
              onClick={() => handleMemberClick({ memberId: member.group_member_id })}
            >
              <Avatar
                imagePath={member.avatar_path}
                style={styles.avatar}
              />
              <p style={styles.contentName}>{member.full_name}</p>
            </div>
          ))}
        </div>
      ) : <Spinner />}
    </AuxiliaryColumn>
  )
}

const style = (theme, font) => ({
  contentHeader: {
    fontSize: 18,
    color: theme.actionText,
    ...font.bold,
    
    padding: '10px 25px',
  },

  actionContainer: {
    flexDirection: 'column',
    display: 'flex',
    gap: 10,

    padding: '0 15px 15px 15px'
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
    color: theme.actionText,
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
    fontSize: 16,
    color: theme.secondaryText,
    ...font.regular,

    alignSelf: 'center',
  },
})
