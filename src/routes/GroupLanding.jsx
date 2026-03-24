import { useMemo, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import HorizontalOptionRow from "../components/HorizontalOptionRow";
import GroupHeader from "../components/Group/GroupHeader";

import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function GroupLanding() {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const [selected, setSelected] = useState("overview");
  const options = [
    { label: 'Overview', value: 'overview' },
    { label: 'Study queue ', value: 'queue' },
  ];

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    const option = options.find(opt => opt.value === currentPath) ? currentPath : "overview";
    setSelected(option);
  }, [location]);

  const handleOptionChange = (option) => {
    const newPath = option === "overview" ? "" : option;
    navigate(newPath, { replace: true });
  }

  return (
    <div style={styles.container}>
      <GroupHeader />
      <div style={styles.optionsRow}>
        <HorizontalOptionRow
          options={options}
          optionSelected={selected}
          onOptionChange={handleOptionChange}
        />
      </div>
      <Outlet />
    </div>
  )
}

const style = (theme, font) => ({
  container: {
  },
  
  optionsRow: {
    padding: '0px 20px 40px 20px',
  },
  
  contentContainer: {
    padding: '0px 20px',
    flexDirection: 'column',
    display: 'flex',
    gap: 40,
  },
  contentHeader: {
    fontSize: 18,
    color: theme.primaryText,
    ...font.bold,

    marginBottom: 25,
  },
  timelineHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,

    marginBottom: 30,
    marginLeft: 15
  },
  timelineHeaderText: {
    fontSize: 20,
    color: theme.secondaryText,
    ...font.bold,
  },

  memberRow: {
    marginBottom: 20, 
    display: 'flex', 
    alignItems: 'center', 
    gap: 15
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  memberText: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 16,

    flex: 1,
  },
  memberRoleText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 800,
  },

  memberActionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',

    backgroundColor: theme.red
  },
  memberActionButton: {
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
