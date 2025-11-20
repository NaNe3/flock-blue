import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  return useContext(DashboardContext);
}

export default function DashboardProvider({ children }) {
  const expandedWidth = window.innerWidth - 90;
  // 110 is the width of the navigation bar + gap

  const [dashboard, setDashboard] = useState({
    width: 1100,
    // width: expandedWidth,
  });

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard, expandedWidth }}>
      {children}
    </DashboardContext.Provider>
  );
}