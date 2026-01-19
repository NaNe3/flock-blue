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
    // const [start, end] = getDateSpanForNextOneHundredDays()
    const result = handlePlanItemRetrieval({
      planIds: aggregatedPlanIds,
      initial_timestamp: start,
      final_timestamp: end,
    });
    console.log('filteredPlanItems', result);

    return result
  }, [planItems]);

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
}