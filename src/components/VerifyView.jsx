import { useEffect, useRef } from 'react';
import { useHolos } from '../context/HolosProvider';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft04Icon } from '@hugeicons-pro/core-solid-rounded';
import { constants } from '../utility/colors';

export default function VerifyView({ 
  phone,
  otp,
  setOtp, 
  setCodeRequested,
  codeVerificationErrorMessage,

  countdown,
  attempts,
  sendOTP,
}) {
  
  const { color } = useHolos()
  
  const inputRefs = useRef([]);
  const formattedPhone = `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow single digits
    if (value.length > 1) return;
    
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setOtp(pasteData.padEnd(6, ''));
    
    // Focus the next empty input or last input
    const nextIndex = Math.min(pasteData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleReturn = () => setCodeRequested(false);


  return (
    <div style={styles.container}>
      <div 
        style={styles.backButton}
        onClick={handleReturn}
      >
        <HugeiconsIcon
          icon={ArrowLeft04Icon}
          size={18}
          color="#777"
        />
        <p style={styles.generalText}>go back</p>
      </div>
      <div style={styles.inputRow}>
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={otp[index] || ''}
            onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            style={{
              ...styles.input,
              color
            }}
            maxLength={1}
          />
        ))}
      </div>
      <div style={styles.bottomSection}>
        {codeVerificationErrorMessage && (
          <p style={{ ...styles.generalText, color: constants.red }}>{codeVerificationErrorMessage}</p>
        )}
        <p style={styles.generalText}>code sent to {formattedPhone}</p>
        {countdown > 0 ? (
          <p style={styles.generalText}>try again in {countdown}s</p>
        ) : attempts < 3 ? (
          <p 
            style={{
              ...styles.generalText, 
              color, 
              cursor: 'pointer'
            }}
            onClick={() => {
              if (attempts < 3) {
                sendOTP();
              }
            }}
          >send new code</p>
        ) : (
          <p style={{ ...styles.generalText,  color, width: '300px' }}>
            if that doesn't work, we can... uh.. try again later?
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '40px',
  },

  backButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '8px',
  },

  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  input: {
    width: '50px',
    height: '62px',
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: '0px', 
    borderRadius: '12px',
    backgroundColor: '#2a2a2a',
    outline: 'none',
  },

  bottomSection: {
    width: '100%',
    flex: 1, // This will make it fill remaining space
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Optional: pushes content to bottom
  },

  generalText: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#777',

    // textAlign: 'center',
  },
}