import { useEffect, useMemo, useState } from "react";

import { useGroup } from "../../context/GroupProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useFont } from "../../context/FontProvider";
import { useMedic } from "../../context/MedicProvider";
import { getAllLogsOfUsersStudyingGroupPlan } from "../../utility/db-log";
import Spinner from "../Spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, Calendar04Icon, CalendarRemove01Icon, ClockIcon, GridIcon, InformationCircleIcon, User02Icon } from "@hugeicons-pro/core-solid-rounded";
import GraphBar from "./GraphBar";

export default function GroupLogOverview({ }) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);  

  const { groupMembers, planId } = useGroup();
  const { publishError } = useMedic();

  const [showWhitespace, setShowWhitespace] = useState(true);
  const [selected, setSelected] = useState("highestUniqueUsers");
  const [logs, setLogs] = useState({
    data: null,
    highestStudiedInADay: 0,
  });

  const [hovering, setHovering] = useState(null);

  const explanation = {
    highestUniqueUsers: "Number of unique users studying by day",
    highestLogs: "Number of sections completed by all users by day",
    highestTimeStudied: "Total time studied by all users by day",
  }

  useEffect(() => {
    const init = async () => {
      const userIds = groupMembers.map(member => member.id).filter(id => id !== 217 && id !== 159);
      const { data, error } = await getAllLogsOfUsersStudyingGroupPlan({ userIds, planId });

      if (error) {
        publishError({ message: "could not get logs", reason: error })
      } else {
        organizeLogs(data);
      }
    }

    if (!groupMembers) return;
    if (groupMembers.length === 0) {
      setLogs({ data: {}, highestStudiedInADay: 0 });
    } else {
      init();
    }
  }, [groupMembers])

  const organizeLogs = (logs) => {
    // 1. get highest and lowest timestamp
    const timestamps = logs.map(log => new Date(log.created_at).getTime());
    const lowest = timestamps[0]
    const highest = timestamps[timestamps.length - 1]

    // 2. create object with keys of every single day between lowest and highest timestamp
    const logsByDay = {};
    let current = lowest;
    while (current <= highest) {
      const date = new Date(current);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      logsByDay[dateKey] = [];
      current += 24 * 60 * 60 * 1000; // add one day
    }

    // 3. loop through logs and add them to the correct day in the object
    // 3b. get highest number of logs in a single day while looping through logs (for graph scaling)
    let highestUniqueUsers = 0;
    let highestLogs = 0;
    let highestTimeStudied = 0;
    logs.forEach(log => {
      const date = new Date(log.created_at);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      if (logsByDay[dateKey]) {
        logsByDay[dateKey].push(log);
        const uniqueUsersStudyingThatDay = new Set(logsByDay[dateKey].map(log => log.user_id.id)).size;
        const totalTimeStudiedThatDay = logsByDay[dateKey].reduce((total, log) => total + log.time_studied, 0);
        // unique users
        if (uniqueUsersStudyingThatDay > highestUniqueUsers) highestUniqueUsers = uniqueUsersStudyingThatDay;
        // logs
        if (logsByDay[dateKey].length > highestLogs) highestLogs = logsByDay[dateKey].length;
        // time studied
        if (totalTimeStudiedThatDay > highestTimeStudied) highestTimeStudied = totalTimeStudiedThatDay;
      }
    })
    setLogs({ data: logsByDay, statistics: { highestUniqueUsers, highestLogs, highestTimeStudied } });
  }

  const getBarHeight = (data) => {
    if (selected === "highestUniqueUsers") {
      const uniqueUsersStudyingThatDay = new Set(data.map(log => log.user_id.id)).size;
      return uniqueUsersStudyingThatDay === 0 ? 0 : (uniqueUsersStudyingThatDay / logs.statistics.highestUniqueUsers) * 200;
    } else if (selected === "highestLogs") {
      const logsThatDay = data.length;
      return logsThatDay === 0 ? 0 : (logsThatDay / logs.statistics.highestLogs) * 200;
    } else if (selected === "highestTimeStudied") {
      const totalTimeStudiedThatDay = data.reduce((total, log) => total + log.time_studied, 0);
      return totalTimeStudiedThatDay === 0 ? 0 : (totalTimeStudiedThatDay / logs.statistics.highestTimeStudied) * 200;
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.containerHeader}>
        <p style={styles.title}>Overview of group statistics</p>
      </div>
      <div style={styles.containerContent}>
        <div style={styles.graph}>
          <div style={styles.graphExplanation}>
            <HugeiconsIcon
              icon={AlertCircleIcon}
              color={theme.actionText}
              size={15}
            />
            <p style={styles.graphExplanationText}>{explanation[selected]}</p>
          </div>
          {logs?.data
            ? Object.keys(logs.data).length === 0
              ? <p style={{ color: theme.secondaryText, ...font.bold }}>No logs yet</p>
              : Object.entries(logs.data).map(([timestamp, data]) => {
                  const shouldShowBar = showWhitespace || data.length > 0;
                  if (!shouldShowBar) return null;

                  const barHeight = getBarHeight(data);

                  return (
                    <GraphBar 
                      key={timestamp} 
                      barHeight={barHeight} 
                      timestamp={timestamp} 
                      logs={data}

                      selected={selected}
                      hovering={hovering}
                      setHovering={setHovering}
                    />
                  )
                })
            : <Spinner />}
        </div>
        <div style={styles.graphActionBar}>
          <div style={styles.timeBar}>
            <p style={styles.graphActionText}>All</p>
            <p className='not-selected' style={styles.graphActionText}>This month</p>
            <p className='not-selected' style={styles.graphActionText}>This week</p>
          </div>
          <div style={styles.filterBar}>
            <div
              className={"hover-opacity"}
              style={{ ...styles.filterIcon, marginRight: 20 }}
              onClick={() => setShowWhitespace(!showWhitespace)}
            >
              <HugeiconsIcon
                icon={showWhitespace ? Calendar04Icon : CalendarRemove01Icon}
                color={theme.actionText}
                size={20}
              />
            </div>

            <div
              className={selected === "highestUniqueUsers" ? "" : "hover-opacity not-selected"}
              style={styles.filterIcon}
              onClick={() => setSelected("highestUniqueUsers")}
            >
              <HugeiconsIcon
                icon={User02Icon}
                color={theme.actionText}
                size={20}
              />
            </div>
            <div
              className={selected === "highestLogs" ? "" : "hover-opacity not-selected"}
              style={styles.filterIcon}
              onClick={() => setSelected("highestLogs")}
            >
              <HugeiconsIcon
                icon={GridIcon}
                color={theme.actionText}
                size={20}
              />
            </div>
            <div
              className={selected === "highestTimeStudied" ? "" : "hover-opacity not-selected"}
              style={styles.filterIcon}
              onClick={() => setSelected("highestTimeStudied")}
            >
              <HugeiconsIcon
                icon={ClockIcon}
                color={theme.actionText}
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    border: `1px solid ${theme.primaryBorder}`,
    borderRadius: 20,
  },

  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    padding: 20,
    borderBottom: `1px solid ${theme.primaryBorder}`,
  },
  title: {
    fontSize: 18,
    color: theme.secondaryText,
    ...font.regular,
  },

  containerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100%',
    padding: 20,
    gap: 20,
  },
  graph: {
    position: 'relative',    

    width: '100%',
    height: 300,
    // padding: 10,
    // backgroundColor: theme.secondaryBackground,
    // borderRadius: 20,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 1,
  },
  graphExplanation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,

    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  graphExplanationText: {
    fontSize: 16,
    color: theme.actionText,
    ...font.regular,
  },
  graphActionBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    padding: '0px 10px',
  },
  
  timeBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  filterBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  filterIcon: {
    cursor: 'pointer',
  },
  graphActionText: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.regular,
  }
})