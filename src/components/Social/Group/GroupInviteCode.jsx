import { useMemo, useRef, useState } from "react";
import BasicButton from "../../BasicButton";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyIconSolidRounded } from "@hugeicons-pro/core-solid-rounded";

export default function GroupInviteCode({ 
  activeCode,
  createGroupInviteCode
}) {
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
                color="#888"
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

const styles = {
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
  },

  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,

    borderRadius: 15,
    padding: '10px 15px',
    backgroundColor: '#1a1a1a',
  },
  link: {
    color: '#888',
    fontSize: 15,
    fontWeight: 600,
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
    fontWeight: 800,
  },

  dropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,

    border: '1px solid #444',
    borderRadius: 10,
    padding: 10,
  },
  dropdownText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 600,
  },
  dropdown: {
    backgroundColor: '#222',
    color: '#fff',
    border: '1px solid #444',
    cursor: 'pointer',

    borderRadius: 10,

    fontWeight: 800,
    outline: 'none',
    border: 'none',
  }
}