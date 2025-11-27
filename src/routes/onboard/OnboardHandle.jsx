import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import BasicButton from "../../components/BasicButton"
import BasicInput from "../../components/BasicInput"

import { isHandleAvailable, updateUserHandleById, updateUserNameById } from "../../utility/db-user"

import { useHolos } from "../../context/HolosProvider"
import { constants } from "../../utility/colors"
import { useOnboard } from "../../context/OnboardProvider"

export default function OnboardFullName() {
  const navigate = useNavigate()
  const { user, color } = useHolos()
  const { onboardData, updateOnboardData } = useOnboard()
  
  const [handle, setHandle] = useState(onboardData.handle)
  const [status, setStatus] = useState({
    processing: false,
    error: null,
    disabled: false,
    available: null
  })

  const handleSetHandle = (value) => {
    const sanitizedValue = value.replace(/[^a-zA-Z0-9_]/g, '')
    setHandle(sanitizedValue)
  }

  useEffect(() => {
    const checkHandle = async () => {
      if (handle.trim().length === 0 || handle.trim().length > 50 ) {
        setStatus(prev => ({ ...prev, disabled: true, available: null }))
        return
      }

      if (handle === onboardData.handle) {
        setStatus(prev => ({ ...prev, disabled: false, error: null }))
        return
      }

      const { available, error } = await isHandleAvailable(handle)
      console.log({ available, error })

      if (error) {
        setStatus(prev => ({ ...prev, error, disabled: true }))
        return
      }

      if (!available) {
        setStatus(prev => ({ ...prev, available: false, disabled: true }))
      } else {
        setStatus(prev => ({ ...prev, available: true, error: null, disabled: false }))
      }
    }

    checkHandle()
  }, [handle])
  
  const handleContinue = async () => {
    if (status.processing || status.disabled) return
    if (handle === onboardData.handle) {
      navigate('/onboard/picture')
      return
    }

    setStatus(prev => ({ ...prev, processing: true }))

    const { error } = await updateUserHandleById({
      userId: user.id,
      handle: handle,
    })

    if (!error) {
      updateOnboardData({ handle })
      navigate('/onboard/picture')
    } else {
      setStatus(prev => ({ ...prev, error, processing: false }))
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.title}>Choose a handle!</p>
        <BasicInput
          value={handle}
          setValue={handleSetHandle}
          placeholder="paul_atreides"
          style={styles.input}
          contentStyle={styles.inputContent}

          leftComponent={
            <p style={{ fontSize: 18, fontWeight: 700, color: '#888' }}>@</p>
          }
        />
        {status.available !== null && (
          <p style={{ ...styles.available, color: !status.available ? constants.red : color }}>@{handle} {status.available ? 'is available' : 'is already taken'}</p>
        )}
        {status.error && ( <p style={styles.error}>{status.error.message}</p> )}
      </div>
      <div style={styles.footerContainer}>
        <BasicButton
          text="continue"
          onClick={handleContinue}
          disabled={status.processing || status.disabled}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',

    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },

  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 20,

    padding: '30px 0'
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#fff',
  },
  input: {
    maxWidth: 350,
    padding: 18,
  },
  inputContent: {
    fontSize: 18,
  },
  available: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 10
  },
  error: {
    color: constants.red,
    fontSize: 18,
    fontWeight: 700,
    marginTop: 40
  },

  footerContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

}