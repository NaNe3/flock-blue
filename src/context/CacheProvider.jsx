import { createContext, useContext, useState } from "react";

const CacheContext = createContext();

export default function CacheProvider({ children }) {
  const [cache, setCache] = useState({})

  const handleCheckCache = (key) => {
    return cache[key]
  }

  const handleUpdateCache = (key, value) => {
    setCache((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <CacheContext.Provider value={{ handleCheckCache, handleUpdateCache }}>
      {children}
    </CacheContext.Provider>
  )
}

export const useCache = () => {
  return useContext(CacheContext)
}