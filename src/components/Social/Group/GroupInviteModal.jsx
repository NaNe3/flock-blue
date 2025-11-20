import { useEffect, useState } from "react";

import { useHolos } from "../../../context/HolosProvider";

import { getPendingGroupInvitesByGroupId, sendGroupInvite } from "../../../utility/db-groups";
import { getUserByQuery } from "../../../utility/db-relationship";

import SearchBar from "../../SearchBar";
import InvitePersonRow from "./InvitePersonRow";

export default function GroupInviteModal({ groupId, groupMemberIds }) {
  const { user, friends } = useHolos();

  const [pending, setPending] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

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
      // Placeholder for fetching active invite code logic
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
      <div style={styles.alternativeInvite}>
        <p style={styles.alternativeText}>or they can join with this code</p>
        <p style={styles.alternativeCode}>XU9N3R</p>
      </div>
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

  alternativeInvite: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,

    padding: 20
  },
  alternativeText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 600,
  },
  alternativeCode: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 800,
  }
}