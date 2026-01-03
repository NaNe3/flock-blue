import { useMemo } from "react";

import FadeInView from "./FadeInView";
import PlanItemCard from "./Overview/PlanItemCard";

import { timeAgoSpecific } from "../utility/time";

export default function PlanItemsTimeline({
  navigation,
  planItems,
}) {
  const getFiveDays = () => {
    const today = new Date()
    const datesArray = []
    for (let i = 0; i < 5; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      datesArray.push(date.toDateString())
    }

    return datesArray
  }

  const dates = getFiveDays()

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

    // Sort dates chronologically
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b))
    
    const sortedGrouped = {}
    sortedDates.forEach(date => {
      sortedGrouped[date] = grouped[date]
    })
    
    return sortedGrouped
  }

  const groupedPlanItems = useMemo(() => groupItemsByDate(planItems), [planItems])

  return !planItems ? null : (
    <FadeInView style={styles.content}>
      {dates.map(date => (
        <div style={styles.dateGroup} key={date}>
          <span style={styles.dateHeader}>{timeAgoSpecific(date)}</span>
          {groupedPlanItems[date] ? (
            <div style={styles.itemsContainer}>
              {groupedPlanItems[date].map(item => (
                <PlanItemCard
                  navigation={navigation}
                  key={item.plan_item_id}
                  planItem={item}
                  currentPlanItemId={900}
                />
              ))}
            </div>
          ) : (
            <span style={styles.noItemsText}>No items for this day.</span>
          )}
        </div>
      ))}
    </FadeInView>
  )
}

const styles = {
  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    gap: '50px',
  },
  dateGroup: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: '15px',
  },
  dateHeader: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 800,
    paddingLeft: '15px',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  noItemsText: {
    color: '#aaa',
    fontSize: '16px',
    fontWeight: 600,
    paddingLeft: '15px',
  },
  noPlanItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPlanItemsInfoContainer: {
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  npiSubtitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#ccc',
    marginTop: '5px',
  },
}
