import { useEffect, useMemo, useState } from "react";

import PlanItemAnalyticalCard from "./PlanItemAnalyticalCard";
import Spinner from "../Spinner";

import { timeAgoSuperSpecific } from "../../utility/time";

import { useTheme } from "../../context/ThemeProvider";
import { useGroup } from "../../context/GroupProvider";
import { useStudy } from "../../context/StudyProvider";
import { useFont } from "../../context/FontProvider";
import PlanItemsTimelineAnalytical from "./PlanItemsTimelineAnalytical";

export default function GroupWeekActivity({ }) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);  

  const { planItems, checkProcessedStateForDateSpan, handlePlanItemsAudit, handlePlanItemRetrieval } = useStudy()
  const { groupMembers, planId } = useGroup();

  const [rawPlanItems, setRawPlanItems] = useState(null);
  const datesFromWeek = useMemo(() => {
    const sunday = new Date();
    sunday.setDate(sunday.getDate() - sunday.getDay())
    const saturday = new Date(sunday);
    saturday.setDate(saturday.getDate() + 6);
    return {
      timestamp: [sunday.toISOString(), saturday.toISOString()],
      string: [sunday.toDateString(), saturday.toDateString()]
    }
  }, [])

  useEffect(() => {
    if (!planId) return;
    const props = {
      planIds: [planId],
      initial_timestamp: datesFromWeek.timestamp[0],
      final_timestamp: datesFromWeek.timestamp[1],
    }

    const allProcessed = checkProcessedStateForDateSpan(props);

    if (!allProcessed) {
      handlePlanItemsAudit(props);
    } else {
      const requested = handlePlanItemRetrieval(props);
      if (requested && requested !== rawPlanItems) {
        setRawPlanItems(requested);
      }
    }
  }, [planItems, planId]);

  const percentCompleted = useMemo(() => {
    if (!rawPlanItems || !groupMembers) return null;

    const piCount = rawPlanItems.reduce((total, items) => total + items?.length, 0);
    const completedCount = rawPlanItems.reduce((total, item) => {
      return total + item.completionists?.length, 0;
    }, 0);

    const percent = piCount > 0 ? Math.floor((completedCount / (piCount * groupMembers?.length)) * 100) : 0;
    return percent;
  }, [rawPlanItems, groupMembers])

  return (
    <div style={styles.container}>
      <div style={styles.containerHeader}>
        <p style={styles.containerHeaderText}>Readings for this week</p>
        {percentCompleted !== null && <p style={styles.containerHeaderSubtext}>{percentCompleted}% completed</p>}
      </div>
      <div style={styles.content}>
        <PlanItemsTimelineAnalytical
          planItems={rawPlanItems}
          dates={datesFromWeek.string}
        />
        {/* {percentCompleted !== null 
          ? Object.keys(rawPlanItems)?.length > 0
            ? (
              Object.entries(rawPlanItems).map(([date, items]) => (
                <div 
                  key={date}
                  style={styles.dayContent}
                >
                  <h4 style={styles.dateSectionHeaderText}>{timeAgoSuperSpecific(date)}</h4>
                  {items.map(item => (
                    <PlanItemAnalyticalCard
                      key={item.plan_item_id}
                      planItem={item}
                    />
                  ))}
                </div>
              ))
            ) : (
              <p style={styles.containerHeaderText}>No readings found for this week.</p>
            )
          : <Spinner />
        } */}
      </div>
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,

    borderColor: theme.primaryBorder,
    borderStyle: 'solid',
    borderRadius: 20,
    borderWidth: 1,
  },
  
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,

    padding: 20,

    borderBottomWidth: 1,
    borderBottomColor: theme.primaryBorder,
    borderBottomStyle: 'solid',
  },
  containerHeaderText: {
    fontSize: 18,
    color: theme.secondaryText,
    ...font.regular,
  },
  containerHeaderSubtext: {
    fontSize: 18,
    color: theme.red,
    ...font.bold,

    opacity: 0.6,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,

    padding: 20,
  },
  dayContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  dateSectionHeaderText: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.bold,

    marginLeft: 15,
  },
})