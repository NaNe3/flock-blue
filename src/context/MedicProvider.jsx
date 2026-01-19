import { createContext, useContext, useMemo, useState } from "react";

import ErrorAlert from "../components/ErrorAlert"

const MedicContext = createContext();

export default function MedicProvider({ children }) {
  // list of errors published to queue
  const [queue, setQueue] = useState([])

  // current error displayed
  const displayed = useMemo(() => {
    if (queue.length === 0) return null
    return queue[0]
  }, [queue])

  // remove error from queue
  const destroyError = (id) => {
    setQueue(prevQueue => prevQueue.filter(item => item.id !== id))
  }

  // publish error to queue
  // params: message, reason
  const publishError = (error) => {
    setQueue(prevQueue => [
      ...prevQueue,
      {
        id: Math.random().toString(36).substring(2, 15),
        error,
      }
    ])
  }

  return (
    <MedicContext.Provider value={{ publishError }}>
      {displayed !== null && (
        <ErrorAlert
          error={displayed.error}
          onDismiss={() => { destroyError(displayed.id) }}
        />
      )}
      {children}
    </MedicContext.Provider>
  )
}

export const useMedic = () => {
  return useContext(MedicContext)
}