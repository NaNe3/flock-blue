import { useEffect, useMemo, useRef, useState } from 'react';

import SimpleAvatarRow from '../SimpleAvatarRow';
import BasicButton from '../BasicButton';
import Avatar from '../Avatar';

import { getGroupByCode, joinGroup } from '../../utility/db-groups';

import { useModal } from '../../context/ModalProvider';
import { useHolos } from '../../context/HolosProvider';
import { useTheme } from '../../context/ThemeProvider';
import { useMedic } from '../../context/MedicProvider';
import { useStudy } from '../../context/StudyProvider';
import { useFont } from "../../context/FontProvider";

export default function AddGroupByCodeModal() {

  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => getStyles(theme, font), [theme, font]);  

  const { setPlans, setPlanItems } = useStudy()
  const { user, setGroups } = useHolos();
  const { handleModalClose } = useModal();
  const { publishError } = useMedic();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [state, setState] = useState({
    processing: false,
    group: null,
    foundNoGroup: false,
  }); 

  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      submitGroupCode(code.join(''));
    }
  }, [code]);

  const submitGroupCode = async (groupCode) => {
    setState((prev) => ({ ...prev, processing: true, foundNoGroup: false }));
    const { data } = await getGroupByCode(groupCode, user.id);
    if (data) {
      setState((prev) => ({ ...prev, group: data, foundNoGroup: false, processing: false }));
    } else {
      setState((prev) => ({ ...prev, group: null, foundNoGroup: true, processing: false }));
    }
  }

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    // Only allow alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(text)) {
      setCode(newCode);
      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    if (state.foundNoGroup) {
      setState((prev) => ({ ...prev, foundNoGroup: false }));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0) {
      if (index !== 5 || code[index] === '') {
        setCode((prevCode) => {
          const newCode = [...prevCode];
          newCode[index-1] = '';
          return newCode;
        });
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // const handleGroupReset = () => {
  //   setState({ processing: false, group: null, foundNoGroup: false });
  //   setCode(['', '', '', '', '', '']);
  //   inputRefs.current[0]?.focus();
  // }

  const handleJoinButtonPress = async () => {
    if (state?.group?.isMember || state.processing) return

    setState((prev) => ({ ...prev, processing: true }));
    const { group, plan, error } = await joinGroup({ groupId: state.group.group_id, userId: user.id });

    if (error) {
      publishError({
        message: 'Could not join group',
        reason: error?.message
      })
    } else {
      if (group) {
        setGroups(prev => [...prev, group]);
      }
      if (plan) {
        setPlans(prev => [...prev, plan]);
        setPlanItems(prev => ({ ...prev, [plan.plan_id]: [] }));
      }
      handleModalClose();
    }
  }


  return (
    <div style={styles.container}>
      {!state.group ? (
        <div style={styles.content}>
          <div style={styles.header}>
            <h2 style={styles.title}>Enter Group Code</h2>
            <p style={styles.subtitle}>All codes will expire after a certain amount of time. If expired, please request a new one.</p>
          </div>
          <div style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => inputRefs.current[index] = ref}
                style={{
                  ...styles.codeInput,
                  ...(state.processing ? styles.codeInputDisabled : {}),
                  textAlign: 'center'
                }}
                value={digit}
                onChange={(e) => handleCodeChange(e.target.value.slice(-1), index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                autoFocus={index === 0}
                autoComplete="off"
              />
            ))}
          </div>
          {state.foundNoGroup && (
            <p style={styles.foundNoGroupText}>This code is either expired or invalid. This may be the saddest day of my life</p>
          )}
        </div>
      ) : (
        <div style={styles.content}>
          <Avatar
            imagePath={state?.group?.group_image}
            type="group"
            style={styles.avatar}
          />
          <div style={styles.inviteContainer}>
            <div style={styles.inviteContent}>
              <h3 style={styles.groupName}>{state?.group?.group_name}</h3>
              <SimpleAvatarRow
                people={state?.group?.avatars}
                text={`${state?.group?.memberCount} members`}
              />
            </div>
            <BasicButton
              text={state?.group?.isMember ? 'already a member' : 'join'}
              onClick={handleJoinButtonPress}
              disabled={state?.group?.isMember || state.processing}
            />
            {/* <button
              disabled={state.group.isMember || state.processing}
              onPress={handleJoinButtonPress}
              style={styles.button}
            >
              {state.group.isMember ? (
                <div style={styles.buttonContent}>
                  <HugeiconsIcon
                    icon={Tick04Icon}
                    size={32}
                    color="#fff"
                  />
                  <p style={styles.joinButtonText}>already a member</p>
                </div>
              ) : (
                <div style={styles.buttonContent}>
                  <HugeiconsIcon
                    icon={PartyIcon}
                    size={32}
                    color="#fff"
                  />
                  <p style={styles.joinButtonText}>join group</p>
                </div>
              )}
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}

function getStyles(theme, font) {
  return {
    container: {
      display: 'flex',
      width: 400,
      height: 500,

      padding: '40px 0px'
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      alignItems: 'center',
      padding: '30px 20px',
    },

    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    title: {
      color: theme.actionText,
      fontSize: '22px',
      ...font.bold,
      textAlign: 'center',
      margin: 0,
    },
    subtitle: {
      color: theme.secondaryText,
      fontSize: '16px',
      ...font.regular,
      textAlign: 'center',
      margin: 0,
    },
    foundNoGroupText: {
      color: theme.red,
      fontSize: '16px',
      ...font.bold,
      textAlign: 'center',
      margin: 0,
    },

    codeInputContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0 20px',
    },
    codeInput: {
      width: '45px',
      height: '55px',
      border: `2px solid ${theme.primaryBorder}`,
      borderRadius: '10px',
      color: theme.actionText,
      fontSize: '24px',
      ...font.bold,
      backgroundColor: 'transparent',
      outline: 'none',
    },
    codeInputDisabled: {
      opacity: 0.5,
    },

    headerIcon: {
      width: '35px',
      height: '35px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.secondaryBackground,
      border: 'none',
      cursor: 'pointer',
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50px',
    },
    inviteContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    inviteContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    groupName: {
      color: theme.actionText,
      fontSize: 24,
      ...font.bold,
      margin: 0,
    },
    button: {
      width: '200px',
      borderRadius: 15,
      backgroundColor: theme.blue,
      border: 'none',
      cursor: 'pointer',
      padding: 15,
      marginTop: '10px',
    },
    buttonContent: {
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    joinButtonText: {
      color: '#fff',
      fontSize: '16px',
      ...font.bold,
    },
  };
}