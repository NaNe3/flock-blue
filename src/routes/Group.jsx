import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon, SentIcon } from "@hugeicons-pro/core-solid-rounded";

import { getGroupsMembersByGroupId } from "../utility/db-groups";
import { constants, roleColors } from "../utility/colors";

import InsertPlanItemsByPlanId from "../components/Group/InsertPlanItemsByPlanId";
import GroupSettingsPopup from "../components/Social/Group/GroupSettingsPopup";
import GroupInviteModal from "../components/Social/Group/GroupInviteModal";
import SimpleHeader from "../components/SimpleHeader";
import Avatar from "../components/Avatar";

import { useStudy } from "../context/StudyProvider";
import { useHolos } from "../context/HolosProvider";
import { useModal } from "../context/ModalProvider";
import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function Group() {
  const { groupId } = useParams();

  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { user, groups } = useHolos()
  const { handleModalOpen } = useModal();
  const { plans } = useStudy()

  const [showPopup, setShowPopup] = useState({
    settings: false,
    member: [],
  });

  const [groupMembers, setGroupMembers] = useState([]);

  const group = useMemo(() => {
    const group_id = parseInt(groupId);
    const group = groups.find(g => g.group_id === group_id)
    return group;
  }, [groupId, groups]);
  const planId = useMemo(() => {
    return plans.find(p => p.group_id === group?.group_id)?.plan_id
  }, [group, plans]);
  const infoRegardingUser = useMemo(() => {
    return {
      isGroupLeader: groupMembers.some(member => member.id === user.id && member?.is_leader),
      isMember: groupMembers.some(member => member.id === user.id),
      isPending: groupMembers?.find(member => member.id === user.id)?.status === 'pending',
    };
  }, [groupMembers]);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await getGroupsMembersByGroupId({ group_id: group?.group_id });
      setGroupMembers(data);
    }
    if (group) init()
  }, [group])

  const handleShowMemberPopup = useCallback((memberId, isVisible) => {
    setShowPopup(prev => ({
      ...prev,
      member: isVisible ? memberId : -1 
    }))
  }, []);

  const handleShowGroupInviteModal = () => {
    handleModalOpen({ content: <GroupInviteModal groupId={group?.group_id} groupMemberIds={groupMembers.map(m => m.id)} /> })
  }

  return (
    <div style={styles.container}>
      <SimpleHeader 
        title={group?.group_name}
        style={styles.header}
        top={30}
      />
      <div style={styles.headerContainer}>
        <Avatar
          imagePath={group?.group_image}
          style={styles.avatar}
        />
        <div style={styles.groupDetails}>
          <div style={styles.groupDetailsContent}>
            <h1 style={styles.groupName}>{group?.group_name}</h1>

          </div>
          <div style={styles.headerRightComponent}>
            {infoRegardingUser?.isGroupLeader && (
              <>
                <div style={{ position: 'relative' }}>
                  <div 
                    className="circle-button outline"
                    style={styles.headerIcon}
                    onClick={() => setShowPopup(prev => ({ ...prev, settings: true }))}
                  >
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      size={26}
                      color={theme.actionText}
                    />
                  </div>
                  <GroupSettingsPopup 
                    visible={showPopup.settings}
                    setVisible={setShowPopup}
                    groupId={group?.group_id}
                  />
                </div>
                <div
                  className='hover-background' 
                  style={styles.inviteButtonContainer}
                  onClick={handleShowGroupInviteModal}
                >
                  <HugeiconsIcon
                    icon={SentIcon}
                    size={14}
                    color={theme.actionText}
                  />
                  <p style={styles.inviteButtonText}>invite</p>
                </div>
              </>
            )}
            <p 
              className='circle-button'
              style={{
                ...styles.groupActionButton,
                ...(
                  infoRegardingUser?.isMember 
                    ? styles.memberTheme 
                    : infoRegardingUser?.isPending 
                      ? styles.pendingTheme 
                      : styles.joinTheme
                )
              }}
            >
              {infoRegardingUser?.isMember ? 'member' : infoRegardingUser?.isPending ? 'pending' : 'join group'}
            </p>
          </div>
        </div>
      </div>

      <div style={styles.contentContainer}>
        {/* <InsertPlanItemsByPlanId planId={planId} /> */}
        {/* <h2 style={styles.contentHeader}>5 members</h2>
        {groupMembers.map(member => {
          const isVisible = showPopup.member === member.id;

          return (
            <div key={member.id} style={styles.memberRow}>
              <Avatar
                imagePath={member.avatar_path}
                style={styles.memberAvatar}
              />
              <p style={styles.memberText}>{member.full_name} <span style={{ ...styles.memberRoleText, color: roleColors[member.role.role_name] }}>{member.role.role_name}</span></p>
              {infoRegardingUser?.isGroupLeader && (
                <div style={{ ...styles.memberActionContainer, position: 'relative' }} >
                  <div 
                    className='circle-button outline'
                    style={styles.memberActionButton}
                    onClick={() => handleShowMemberPopup(member.id, !isVisible)}
                  >
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      size={20}
                      color={theme.actionText}
                    />
                  </div>
                  <GroupMemberPopup
                    visible={isVisible}
                    setVisible={() => handleShowMemberPopup(member.id, !isVisible)}
                  />
                </div>
              )}
            </div>
          )
        })} */}
      </div>

    </div>
  )
}

const style = (theme, font) => ({
  container: {
  },
  header: {
    top: 30
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    
    padding: '100px 20px',
  },
  headerRightComponent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    border: `1px solid ${theme.primaryBorder}`,
  },
  groupActionButton: {
    height: 40,    
    width: 100,

    fontSize: 14,
    fontWeight: 800,
    borderRadius: 30,
    cursor: 'pointer',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

  inviteButtonContainer: {
    height: 40,
    padding: '0px 15px',
    borderRadius: 30,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    cursor: 'pointer',

    border: `1px solid ${theme.primaryBorder}`,
    color: theme.primaryText,
    ...font.regular
  },
  inviteButtonText: {
    fontSize: 14,
    color: theme.actionText,
    ...font.bold
  },

  joinTheme: {
    color: constants.purple,
    border: `1px solid ${constants.purple}`,
  },
  pendingTheme: {
    color: theme.orange,
    border: `1px solid ${theme.orange}`,
  },
  memberTheme: {
    color: constants.blue,
    border: `1px solid ${constants.blue}`,
  },

  groupDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
    marginTop: 15,
  },
  avatar: {
    width: 100,
    height: 100,

    borderRadius: 70,
  },
  groupDetailsContent: {
    display: 'flex',
    flexDirection: 'column',
    display: 'flex',
    flex: 1,    

  },
  groupName: {
    fontSize: 28,
    color: theme.primaryText,
    ...font.bold,
  
    maxWidth: 500
  },

  contentContainer: {
    padding: '0px 20px',
  },
  contentHeader: {
    fontSize: 18,
    color: theme.primaryText,
    ...font.bold,

    marginBottom: 25,
  },

  memberRow: {
    marginBottom: 20, 
    display: 'flex', 
    alignItems: 'center', 
    gap: 15
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  memberText: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 16,

    flex: 1,
  },
  memberRoleText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 800,
  },

  memberActionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',

    backgroundColor: theme.red
  },
  memberActionButton: {
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
