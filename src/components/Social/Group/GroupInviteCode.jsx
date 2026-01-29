import { useMemo, useRef, useState } from "react";
import BasicButton from "../../BasicButton";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyIconSolidRounded } from "@hugeicons-pro/core-solid-rounded";
import { useTheme } from "../../../context/ThemeProvider";
import { useFont } from "../../../context/FontProvider";

export default function GroupInviteCode({ 
  activeCode,
  createGroupInviteCode
}) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const [expiration, setExpiration] = useState('24h');
  const [isGenerating, setIsGenerating] = useState(false);
  const linkRef = useRef(null);

  const timeToExpireUTC = useMemo(() => {
    if (!activeCode) return

    const expires = activeCode.expires_at;
    const now = new Date();
    const diff = new Date(expires) - now;

    if (diff <= 0) return 'expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days >= 1) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  }, [activeCode]);

  const handleExpirationChange = (e) => {
    const selectedExpiration = e.target.value;
    if (selectedExpiration) {
      setExpiration(selectedExpiration);
    }
  }

  const handleCodeGeneration = () => {
    if (isGenerating) return;
    createGroupInviteCode(expiration);
    setIsGenerating(true);
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`https://flock.blue/invite/${activeCode?.invite_code}`);
    
    if (linkRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(linkRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div style={styles.alternativeInvite}>
      {activeCode ? (
        <>
          {timeToExpireUTC.length < 8 && (
            <p style={styles.alternativeText}>your code expires in {timeToExpireUTC}</p>
          )}
          <p style={styles.alternativeCode}>{activeCode?.invite_code}</p>
          <div style={styles.linkContainer}>
            <p ref={linkRef} style={styles.link}>https://flock.blue/invite/{activeCode?.invite_code}</p>
            <div 
              style={styles.linkCopy}
              className="hover-expand"
              onClick={handleCopyClick}
            >
              <HugeiconsIcon 
                icon={CopyIconSolidRounded} 
                width={20} 
                height={20} 
                color={theme.actionText}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <p style={styles.alternativeText}>or create an invite code/link</p>
          <div style={styles.actionContainer}>
            <div style={styles.dropdownContainer}>
              <p style={styles.dropdownText}>expires in </p>
              <select 
                value={expiration}
                onChange={handleExpirationChange} 
                style={styles.dropdown}
              >
                <option value="24h">24 hours</option>
                <option value="7d">7 days</option>
                <option value="30d">30 days</option>
                <option value="never">never</option>
              </select>
            </div>
            <BasicButton
              text="generate code"
              style={styles.button}
              onClick={handleCodeGeneration}
              disabled={isGenerating}
            />
          </div>
        </>
      )}
    </div>
  )
}

const style = (theme, font) => ({
  alternativeInvite: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,

    padding: 20
  },
  alternativeText: {
    color: theme.actionText,
    fontSize: 14,
    ...font.regular
  },
  alternativeCode: {
    color: theme.actionText,
    fontSize: 20,
    ...font.bold
  },

  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,

    borderRadius: 15,
    padding: '10px 15px',
    backgroundColor: theme.secondaryBackground,
  },
  link: {
    fontSize: 15,
    color: theme.actionText,
    ...font.regular
  },
  linkCopy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    padding: '8px 15px',
    borderRadius: 10,
    fontSize: 14,
    ...font.bold
  },

  dropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,

    border: `1px solid ${theme.primaryBorder}`,
    borderRadius: 10,
    padding: 10,
  },
  dropdownText: {
    color: theme.actionText,
    fontSize: 14,
    ...font.regular
  },
  dropdown: {
    backgroundColor: theme.secondaryBackground,
    color: theme.actionText,
    border: `1px solid ${theme.primaryBorder}`,
    cursor: 'pointer',

    borderRadius: 10,

    ...font.bold,
    outline: 'none',
    border: 'none',
  }
})
