import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckBoxedText from "../components/CheckBoxText";
import BasicButton from "../components/BasicButton";
import VerifyView from "../components/VerifyView";

import { sendPhoneNumberVerification, verifyPhoneNumberWithOTP } from "../utility/authenticate";

export default function Signin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [codeRequested, setCodeRequested] = useState(false);
  const [hoveringFlock, setHoveringFlock] = useState(false);

  const [terms, setTerms] = useState(false);
  const [SMS, setSMS] = useState(false);

  const disabled = useMemo(() => {
    if (!codeRequested) {
      return !(terms && SMS && phone.length === 10);
    } else {
      return !(terms && SMS && phone.length === 10 && otp.length === 6);
    }
  }, [phone, codeRequested, phone, terms, SMS, otp]);

  const handleNavigate = () => navigate('/')

  const handleContinue = async () => {
    if (disabled) return;
    if (codeRequested) {
      await verifyOtp();
    } else {
      setCodeRequested(true);
      if (attempts < 3) {
        await sendOtp();
      }
    }
  }

  const sendOtp = async () => {
    const { error } = await sendPhoneNumberVerification({ phone: `+1${phone}` });
    if (!error) {
      startCountdown();
    }
  }

  const verifyOtp = async () => {
    const isValidOtp = otp.length === 6
    const isValidPhone = phone.length === 10

    if (isValidOtp && isValidPhone) {
      (true)
      const { data, error } = await verifyPhoneNumberWithOTP({ phone: `+1${phone}`, token: otp })
      // console.log('VERIFY: ', { data, error })

      const uuid = data?.user?.id
    }
  }

  const [countdown, setCountdown] = useState(40)
  const [attempts, setAttempts] = useState(0)
  const intervalActive = useRef(false)

  const startCountdown = () => {
    if (intervalActive.current) return
    setCountdown(40)
    setOtp('')
    setAttempts(prev => prev + 1)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  } 

  return (
    <div style={styles.scholarsContainer}>
      <div className="full-screen">
        <div className="full-screen-content content-gap">
          <p
            className="hover-expand" 
            style={{
              ...styles.title,
              ...(hoveringFlock ? { color: '#0ba3ff' } : {} )
            }}
            onClick={handleNavigate}
            onMouseEnter={() => setHoveringFlock(true)}
            onMouseLeave={() => setHoveringFlock(false)}
          >flock</p>

          {!codeRequested ? (
            <div style={styles.content} className="content-gap">
              <div className="input-container">
                <p className="input-prefix">🇺🇸 +1</p>
                <input
                  className="input-field"
                  type="tel"
                  placeholder="123 456 7890"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPhone(value);
                  }}
                />
              </div>

              <div style={styles.checkboxContainer}>
                <CheckBoxedText
                  text={
                    <span>I have read and agree to the <span className="hover-underline" onClick={() => navigate('/terms-of-service')}>Terms of Service</span>, <span className="hover-underline" onClick={() => navigate('/privacy-policy')}>Privacy Policy</span>, and <span className="hover-underline" onClick={() => navigate('/community-guidelines')}>Community Guidelines</span></span>
                  }
                  checked={terms}
                  setChecked={setTerms}
                />
                <CheckBoxedText
                  text="I agree to receive SMS code (thats it)"
                  checked={SMS}
                  setChecked={setSMS}
                />
              </div>
            </div>
          ) : (
            <div style={styles.content} className="content-gap">
              <VerifyView 
                phone={phone}
                otp={otp} 
                setOtp={setOtp}
                setCodeRequested={setCodeRequested}

                countdown={countdown}
                attempts={attempts}
                sendOTP={sendOtp}
              />
            </div>
          )}

          <BasicButton
            text="continue"
            disabled={disabled}
            onClick={handleContinue}
          />
          <p style={styles.copyright}>© 2025 Linger Longer Inc</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  scholarsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',

    // backgroundColor: '#f9f9f9',
  },

  title: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#333',
    // marginBottom: '40px',
    marginTop: '20px',
    cursor: 'pointer',
  },

  checkboxContainer: {
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    gap: '20px',
  },

  copyright: {
    position: 'absolute',
    bottom: '20px',
    fontSize: '13px',
    fontWeight: '800',
    color: '#888',
  }
}