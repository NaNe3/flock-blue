import { useEffect, useState } from "react";

import { useHolos } from "../../../context/HolosProvider";

import { createActiveGroupInviteCode, getPendingGroupInvitesByGroupId, identifyActiveGroupInviteCode, sendGroupInvite } from "../../../utility/db-groups";
import { getUserByQuery } from "../../../utility/db-relationship";

import SearchBar from "../../SearchBar";
import InvitePersonRow from "./InvitePersonRow";
import GroupInviteCode from "./GroupInviteCode";

export default function GroupInviteModal({ groupId, groupMemberIds }) {
  const { user, friends } = useHolos();

  const [pending, setPending] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const [activeCode, setActiveCode] = useState(null);

  useEffect(() => {
    const fetchPendingInvites = async () => {
      const { data, error } = await getPendingGroupInvitesByGroupId({ group_id: groupId });

      if (error) {
        console.error('Error fetching pending invites:', error);
        return;
      }

      const pendingIds = data.map(invite => invite.recipient_id);
      setPending(pendingIds);
    }

    const fetchActiveCode = async () => {
      const { data } = await identifyActiveGroupInviteCode({ group_id: groupId });
      if (data) {
        setActiveCode(data);
      }
    }

    const init = async () => {
      try {
        await Promise.all([
          fetchPendingInvites(),
          fetchActiveCode()
        ]);
      } catch (error) {
        console.error('Error initializing GroupInviteModal:', error);
      }
    }

    init();
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
    } else {
      fetchSearchResults()
    }
  }, [query]);

  const fetchSearchResults = async () => {
    const { data, error } = await getUserByQuery({ query });
    if (data) {
      setSearchResults(data);
    }
  }
  
  const handleInviteUser = async (userId) => {
    if (pending.includes(userId)) return;
    setPending([...pending, userId]);

    const { error } = await sendGroupInvite({
      group_id: groupId,
      recipient_id: userId,
      sender_id: user.id,
    })

    if (error) {
      setPending(pending.filter(id => id !== userId));
      console.error('Error sending group invite:', error);
    }
  }

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  const timeToExpireUTC = (expiresAt) => {
    const now = new Date();
    switch (expiresAt) {
      case '24h':
        now.setHours(now.getHours() + 24);
        break;
      case '7d':
        now.setDate(now.getDate() + 7);
        break;
      case '30d':
        now.setDate(now.getDate() + 30);
        break;
      case 'never':
        return new Date('9999-12-31T23:59:59.999Z').toISOString();
      default:
        now.setHours(now.getHours() + 24);
    }
    return now.toISOString();
  }

  const createGroupInviteCode = async (expiresAt) => {
    // get a 6 digit alphanumeric code
    const code = generateCode();

    // expiresAt is one of '24h', '7d', '30d', '1b' (1 billion years)
    const expirationUTC = timeToExpireUTC(expiresAt);

    // create the invite code
    const { data } = await createActiveGroupInviteCode({
      groupId: groupId,
      inviteCode: code,
      expiresAt: expirationUTC,
    });

    // retrieve it and setActiveCode
    if (data) {
      setActiveCode(data);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.modalHeader}>
        <SearchBar 
          placeholder={"Search by name"} 
          query={query}
          setQuery={setQuery} 
        />
      </div>
      <div style={styles.friendsColumn}>
        {searchResults.length === 0
          ? friends?.map((friend) => {
            const isPending = pending?.includes(friend.id);
            const isMember = groupMemberIds?.includes(friend.id);
            return (
              <InvitePersonRow
                key={`invite-person-${friend.id}`}
                person={friend}
                isPending={isPending}
                isMember={isMember}
                handleInviteUser={handleInviteUser}
              />
            )
          }) : searchResults.map((result) => {
            const isPending = pending?.includes(result.id);
            const isMember = groupMemberIds?.includes(result.id);
            return (
              <InvitePersonRow
                key={`invite-person-${result.id}`}
                person={result}
                isPending={isPending}
                isMember={isMember}
                handleInviteUser={handleInviteUser}
              />
            )
          })
        }
      </div>
      <GroupInviteCode 
        activeCode={activeCode}
        createGroupInviteCode={createGroupInviteCode}
      />
    </div>
  )
}

const styles = {
  container: {
    width: 400,
    height: 600,

    display: 'flex',
    flexDirection: 'column',
  },

  modalHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },

  friendsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    overflowY: 'auto',
    flexGrow: 1,

    padding: 20,

    borderBottom: '1px solid #333',
    borderTop: '1px solid #333'
  },
}