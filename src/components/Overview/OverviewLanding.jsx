import { useMemo } from "react"

import Spinner from "../Spinner";
import PlanItemsTimeline from "../PlanItemsTimeline";

import { getDateSpanForNextFiveDays } from "../../utility/db-plan";

import { useStudy } from "../../context/StudyProvider";

export default function OverviewLanding() {
  const { handlePlanItemRetrieval, aggregatedPlanIds, planItems } = useStudy()

  const filteredPlanItems = useMemo(() => {
    if (!planItems) return [];
    
    const [start, end] = getDateSpanForNextFiveDays()
    const result = handlePlanItemRetrieval({
      planIds: aggregatedPlanIds,
      initial_timestamp: start,
      final_timestamp: end,
    });

    return result
  }, [planItems]);

  // const formatDate = (dateString) => {
  //   const inputDate = new Date(dateString)
  //   inputDate.setHours(23, 59, 59, 999)
  //   const today = new Date()
  //   const diffDays = Math.floor((inputDate - today) / (1000 * 60 * 60 * 24))

  //   if (diffDays === -1) return 'YESTERDAY'
  //   if (diffDays === 0) return 'TODAY'
  //   if (diffDays === 1) return 'TOMORROW'

  //   // Format as "Monday, Jan 1"
  //   return inputDate.toLocaleDateString('en-US', {
  //     weekday: 'long',
  //     month: 'short',
  //     day: 'numeric'
  //   }).toUpperCase()
  // }

  return (
    <div style={styles.container}>
      {!planItems && (
        <Spinner />
      )}
      {filteredPlanItems && (
        <PlanItemsTimeline
          planItems={filteredPlanItems}
        />
      )}
    </div>
  )
}

const styles = {
  container: {
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },

  dateGroup: {
    marginBottom: 30
  },
  dateHeader: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: 800,
    marginBottom: 15,
    borderBottom: '2px solid #444',
    paddingBottom: 8,
    paddingLeft: 15,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  comeFollowMeContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 20,
  }
}