import { useEffect } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon } from "@hugeicons-pro/core-solid-rounded"

import { constants } from "../utility/colors"

export default function ErrorAlert({ error, onDismiss }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, 4000)

    return () => clearTimeout(timer)
  }, [error])

  return (
    <div style={styles.container}>
      <HugeiconsIcon
        icon={Alert02Icon}
        size={20}
        color={constants.red}
        style={styles.errorIcon}
      />
      <p style={styles.error}>{error.message}</p>
    </div>
  )
}

const styles = {
  container: {
    position: 'fixed',
    // bottom: 110,
    bottom: 70,
    left: 30,
    right: 0,
    width: 300,
    backgroundColor: constants.lightRed,
    // borderWidth: 1,
    // borderColor: constants.red,
    borderRadius: 10,
    padding: 16,
    zIndex: 1000,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: 10,
  },
  error: {
    color: constants.red,
    fontSize: 16,
    fontWeight: '700',
  },
}