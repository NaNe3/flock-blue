import { HugeiconsIcon } from '@hugeicons/react'
import { CircleArrowLeft01Icon } from '@hugeicons-pro/core-solid-rounded'
import { useNavigate } from 'react-router-dom'

import { useHolos } from '../../context/HolosProvider'
import { useEffect, useState } from 'react'

export default function OnboardSkeleton({ children }) {
  const { color } = useHolos()
  const navigate = useNavigate()

  const [progress, setProgress] = useState(0)
  const [backEnabled, setBackEnabled] = useState(false)
  const segements = [ 'onboard', 'handle', 'picture' ]

  useEffect(() => {
    const currentPath = window.location.pathname
    const pathSegments = currentPath.split('/').filter(segment => segment !== '')
    const lastSegment = pathSegments[pathSegments.length - 1]

    if (lastSegment === 'onboard') { 
      setBackEnabled(false) 
    } else {
      setBackEnabled(true)
    }

    const segmentIndex = segements.indexOf(lastSegment)
    if (segmentIndex !== -1) {
      setProgress(((segmentIndex + 0.5) / segements.length) * 100)
    } else {
      setProgress(0)
    }
  }, [window.location.pathname])

  const handleBack = () => {
    if (!backEnabled) return
    navigate(-1)
  }

  return (
    <div style={styles.container}>
      <div style={styles.progressContainer}>
        <div 
          className='hover-expand'
          style={styles.progressBackButton}
          onClick={handleBack}
        >
          <HugeiconsIcon
            icon={CircleArrowLeft01Icon}
            color='#444'
            size={34}
          />
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progress, backgroundColor: color, width: `${progress}%` }} />
        </div>
      </div>
      {children}
    </div>
  )
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    padding: "80px 40px",

    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },

  progressContainer: {
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  progressBackButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    display: "flex",
    flex: 1,
    height: 20,
    backgroundColor: "#444",
    borderRadius: 10,

    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 10,

    transition: "0.4s",
  },
};