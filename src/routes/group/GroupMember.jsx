import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import PlanItemsTimelineAnalytical from "../../components/Group/PlanItemsTimelineAnalytical";
import GroupMemberHeader from "../../components/Social/Group/GroupMemberHeader";

import { useGroup } from "../../context/GroupProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useStudy } from "../../context/StudyProvider";
import { useFont } from "../../context/FontProvider";
import { getLogsOfPlanByUserId } from "../../utility/db-plan";
import Spinner from "../../components/Spinner";

export default function GroupMember() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { checkProcessedStateForDateSpan, handlePlanItemsAudit, handlePlanItemRetrieval, planItems } = useStudy()
  const { groupMembers, dates, planId } = useGroup()

  const { memberId } = useParams()
  const member = useMemo(() => {
    if (!groupMembers) return null;
    return groupMembers.find((member) => member.group_member_id === parseInt(memberId))
  }, [groupMembers, memberId])

  const [rawPlanItems, setRawPlanItems] = useState(null);
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    // get plan items for the group's plan
    setLogs(null);
    if (!planId || !member || !dates) return;
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

    getPlanItemsCompleted();
  }, [planItems, member, planId, dates]);

  const getPlanItemsCompleted = async () => {
    const { data, error } = await getLogsOfPlanByUserId({ userId: member.id, planId, dates });
    if (error) {
      console.error("Error fetching logs of plan by user id:", error);
    } else {
      setLogs(data);
    }
  }


  return (
    <div style={styles.container}>
      <GroupMemberHeader member={member} />
      <div style={styles.contentContainer}>
        {!(rawPlanItems && logs) ? (
          <Spinner />
        ) : (
          <PlanItemsTimelineAnalytical
            planItems={rawPlanItems}
            dates={dates}
            logs={logs}
          />
        )}
      </div>
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    padding: '0px 20px',
    flexDirection: 'column',
    display: 'flex',
    gap: 40,
  },
})