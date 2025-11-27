import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import BasicButton from "../../components/BasicButton"
import BasicInput from "../../components/BasicInput"

import { updateUserNameById } from "../../utility/db-user"

import { useHolos } from "../../context/HolosProvider"
import { constants } from "../../utility/colors"
import { useOnboard } from "../../context/OnboardProvider"

export default function OnboardFullName() {
  const navigate = useNavigate()
  const { user } = useHolos()
  const { onboardData, updateOnboardData } = useOnboard()
  
  const [fname, setFname] = useState(onboardData.fname)
  const [lname, setLname] = useState(onboardData.lname)

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (fname.trim().length > 0 && lname.trim().length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [fname, lname])
  
  const handleContinue = async () => {
    if (processing || disabled) return
    if (fname === onboardData.fname && lname === onboardData.lname) {
      navigate('/onboard/handle')
      return
    }

    setProcessing(true)

    const { error } = await updateUserNameById({
      userId: user.id,
      fname: fname,
      lname: lname,
    })

    if (!error) {
      updateOnboardData({ fname, lname })

      navigate('/onboard/handle')
    } else {
      setError(error)
      setProcessing(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.title}>What is your name?</p>
        <BasicInput
          value={fname}
          setValue={setFname}
          placeholder="Paul"
          autoFormat={true}
          style={styles.input}
          contentStyle={styles.inputContent}
        />
        <BasicInput
          value={lname}
          setValue={setLname}
          placeholder="Atreides"
          autoFormat={true}
          style={styles.input}
          contentStyle={styles.inputContent}
        />
        {error && ( <p style={styles.error}>{error.message}</p> )}
      </div>
      <div style={styles.footerContainer}>
        <BasicButton
          text="continue"
          onClick={handleContinue}
          disabled={processing || disabled}
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
    fontSize: 18,

    padding: 18,
  },
  inputContent: {
    fontSize: 18,
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