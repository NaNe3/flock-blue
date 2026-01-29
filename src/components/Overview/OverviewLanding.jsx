import { useEffect, useMemo, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons-pro/core-solid-rounded";

import Spinner from "../Spinner";
import PlanItemsTimeline from "../PlanItemsTimeline";

import { getDateSpanForNextFiveDays } from "../../utility/db-plan";

import { useStudy } from "../../context/StudyProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useFont } from "../../context/FontProvider";

export default function OverviewLanding() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])

  const { aggregatedPlanIds, planItems, checkProcessedStateForDateSpan, handlePlanItemsAudit, handlePlanItemRetrieval } = useStudy()

  const dateSpan = useMemo(() => {
    const [start, end] = getDateSpanForNextFiveDays()
    return { start, end }
  }, [])
  const dateSpanString = useMemo(() => {
    const startDate = new Date(dateSpan.start);
    const endDate = new Date(dateSpan.end);
    return `${startDate.toDateString()} - ${endDate.toDateString()}`;
  }, [dateSpan]);

  const [rawPlanItems, setRawPlanItems] = useState(null);

  useEffect(() => {
    const props = {
      planIds: aggregatedPlanIds,
      initial_timestamp: dateSpan.start,
      final_timestamp: dateSpan.end,
    }

    const allProcessed = checkProcessedStateForDateSpan(props);

    if (!allProcessed) {
      handlePlanItemsAudit(props);
    } else {
      const requested = handlePlanItemRetrieval(props);
      if (requested && requested.length > 0 && requested !== rawPlanItems) {
        setRawPlanItems(requested);
      }
    }
  }, [planItems, aggregatedPlanIds]);

  return (
    <div style={styles.container}>
      {!planItems && (
        <Spinner />
      )}
      <div 
        className="hover-opacity"
        style={styles.timelineHeader}
      >
        <p style={styles.timelineHeaderText}>{dateSpanString}</p>
        <HugeiconsIcon
          icon={ArrowRight02Icon}
          size={20}
          color={theme.secondaryText}
        />
      </div>
      {rawPlanItems && (
        <PlanItemsTimeline
          planItems={rawPlanItems}
        />
      )}
    </div>
  )
}

const style = (theme, font) => ({
  container: {
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
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
})