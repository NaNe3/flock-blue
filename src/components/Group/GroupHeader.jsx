import { useCallback, useMemo, useState } from "react"

import { MoreHorizontalIcon, SentIcon } from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"

import GroupSettingsPopup from "../Social/Group/GroupSettingsPopup"
import GroupInviteModal from "../Social/Group/GroupInviteModal"
import FadeInView from "../FadeInView"
import Avatar from "../Avatar"

import { constants } from "../../utility/colors"

import { useTheme } from "../../context/ThemeProvider"
import { useGroup } from "../../context/GroupProvider"
import { useHolos } from "../../context/HolosProvider"
import { useModal } from "../../context/ModalProvider"
import { useFont } from "../../context/FontProvider"

export default function GroupHeader() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])

  const { group, groupMembers } = useGroup();

  const { handleModalOpen } = useModal();
  const { user } = useHolos()

  const [showPopup, setShowPopup] = useState({
    settings: false,
    member: [],
  });

  const infoRegardingUser = useMemo(() => {
    return {
      isGroupLeader: groupMembers?.some(member => member.id === user.id && member?.is_leader),
      isMember: groupMembers?.some(member => member.id === user.id),
      isPending: groupMembers?.find(member => member.id === user.id)?.status === 'pending',
    };
  }, [groupMembers]);

  const handleShowMemberPopup = useCallback((memberId, isVisible) => {
    setShowPopup(prev => ({
      ...prev,
      member: isVisible ? memberId : -1 
    }))
  }, []);

  const handleShowGroupInviteModal = () => {
    handleModalOpen({ content: <GroupInviteModal groupId={group?.group_id} groupMemberIds={groupMembers?.map(m => m.id) ?? []} /> })
  }

  return (
    <div style={styles.headerContainer}>
      <Avatar
        imagePath={group?.group_image}
        style={styles.avatar}
      />
      <div style={styles.groupDetails}>
        <div style={styles.groupDetailsContent}>
          <h1 style={styles.groupName}>{group?.group_name}</h1>
        </div>
        {groupMembers && (
          <FadeInView style={styles.headerRightComponent}>
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
          </FadeInView>
        )}
      </div>
    </div>

  )
}

const style = (theme, font) => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    
    padding: '100px 20px 60px 20px',
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
  
    maxWidth: 400
  },
})