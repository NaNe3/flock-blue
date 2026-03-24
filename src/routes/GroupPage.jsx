import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";

import GroupLeftColumn from "../components/Social/Group/GroupLeftColumn";

import { useDashboard } from "../context/DashboardProvider";
import { useHolos } from "../context/HolosProvider";
import GroupProvider from "../context/GroupProvider";
import SimpleHeader from "../components/SimpleHeader";

export default function GroupPage() {
  const { groupId } = useParams()

  const { dashboard, setDashboard, expandedWidth } = useDashboard();
  const { groups } = useHolos();

  const group = useMemo(() => groups.find((g) => g.group_id === parseInt(groupId)), [groups, groupId]);

  useEffect(() => {
    if (dashboard.width !== 1100) {
      setDashboard((prev) => ({
        ...prev,
        width: 1100
      }))
    }
  }, []);

  return (
    <GroupProvider group={group}>
      <div style={styles.container}>
        <GroupLeftColumn group={group} />
        <div style={styles.content}>
          <SimpleHeader 
            title={group?.group_name}
            style={{ top: 30 }}
            top={30}
          />
          <Outlet />
        </div>
      </div>
    </GroupProvider>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '101vh',
    width: '100%',

    flexDirection: 'row',
  },
  content: {
    flex: 1,
    height: '100%',
    // padding: '30px 0',
    padding: '30px 20px',

    flexDirection: 'column',
    display: 'flex',
    gap: 60,
  }
}