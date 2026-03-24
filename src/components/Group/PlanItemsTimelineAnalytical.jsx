import { useMemo } from "react";

import PlanItemCompletionistCard from "./PlanItemCompletionistCard";
import FadeInView from "../FadeInView";
import Spinner from "../Spinner";

import { timeAgoSuperSpecific } from "../../utility/time";

import { useTheme } from "../../context/ThemeProvider";
import { useFont } from "../../context/FontProvider";
import PlanItemAnalyticalCard from "./PlanItemAnalyticalCard";

export default function PlanItemsTimelineAnalytical({
  planItems,
  dates,
  includeEmptyDates = false,
  logs,
}) {
  const { theme } = useTheme();
  const { font } = useFont(); 
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const groupItemsByDate = (items) => {
    const grouped = items.reduce((acc, item) => {
      // Assuming your plan items have a 'date_due' field
      const dueDate = new Date(item.date_due).toDateString()
      
      if (!acc[dueDate]) {
        acc[dueDate] = []
      }
      acc[dueDate].push(item)
      return acc
    }, {})
    return grouped;
  }

  const refinedDates = useMemo(() => {
    if (!dates || dates?.length < 2) return [];
    // dates.timestamp[0] is the start, dates.timestamp[1] is the end
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[1]);
    const dateArray = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dateArray.push(d.toDateString());
    }

    return dateArray;
  }, [dates]);


  const groupedPlanItems = useMemo(() => planItems ? groupItemsByDate(planItems) : {}, [planItems])
  const noDayWithItems = Object.keys(groupedPlanItems).length === 0;
  if (!planItems) return <Spinner />

  return (
    <FadeInView style={styles.content}>
      {refinedDates.map(date => {
        const itemsForDate = groupedPlanItems[date] || [];
        return itemsForDate.length > 0 || includeEmptyDates ? (
          <div style={styles.dateGroup} key={date}>
            <span style={styles.dateHeader}>{timeAgoSuperSpecific(date)}</span>
            {itemsForDate.length > 0 ? (
              <div style={styles.itemsContainer}>
                {itemsForDate.map(item => !logs ? (
                  <PlanItemAnalyticalCard
                    key={item.plan_item_id}
                    planItem={item}
                  />
                ) : (
                  <PlanItemCompletionistCard
                    key={item.plan_item_id}
                    planItem={item}
                    log={logs.find(log => log.plan_item_id === item.plan_item_id)}
                  />
                ))}
              </div>
            ) : (
              <span style={styles.noItemsText}>No items for this day.</span>
            )}
          </div>
        ) : null;
      })}
      {noDayWithItems && <p style={styles.containerHeaderText}>No readings found for this week.</p>}
    </FadeInView>
  )
}

const style = (theme, font) => ({
  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    gap: 30,
  },
  dateGroup: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: '15px',
  },
  dateHeader: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.bold,

    marginLeft: 15,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  noItemsText: {
    fontSize: 16,
    color: theme.tertiaryText,
    ...font.regular,

    paddingLeft: 15,
  },
  containerHeaderText: {
    fontSize: 18,
    color: theme.secondaryText,
    ...font.regular,
  },
})
