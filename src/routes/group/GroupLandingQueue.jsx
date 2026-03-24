import { useEffect, useState } from "react"

import PlanItemsTimelineAnalytical from "../../components/Group/PlanItemsTimelineAnalytical"

import { useGroup } from "../../context/GroupProvider";
import { useStudy } from "../../context/StudyProvider";

export default function GroupLandingQueue() {
  const { checkProcessedStateForDateSpan, handlePlanItemsAudit, handlePlanItemRetrieval, planItems } = useStudy()
  const { planId, dates } = useGroup();

  const [rawPlanItems, setRawPlanItems] = useState(null);

  useEffect(() => {
    if (!planId || !dates) return;
    const props = {
      planIds: [planId],
      initial_timestamp: dates[0],
      final_timestamp: dates[1],
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
  }, [planItems, planId, dates]);

  return (
    <div style={styles.container}>
      <PlanItemsTimelineAnalytical
        planItems={rawPlanItems}
        dates={dates}
      />
    </div>
  )
}

const styles = {
  container: {
    padding: '0px 20px',
    flexDirection: 'column',
    display: 'flex',
    gap: 40,
  }
}