import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useStudy } from "./StudyProvider";
import { getGroupsMembersByGroupId } from "../utility/db-groups";
import { firstAndLastPlanItemsForPlan } from "../utility/db-plan";

const GroupContext = createContext();

export default function GroupProvider({ group, children }) {
  const { plans } = useStudy()

  const [groupMembers, setGroupMembers] = useState(null);
  const [dates, setDates] = useState(null);

  const planId = useMemo(() => {
    return plans.find(p => p.group_id === group?.group_id)?.plan_id
  }, [group, plans]);

  useEffect(() => {
    const init = async () => {
      const [membersResult, datesResult] = await Promise.all([
        getGroupsMembersByGroupId({ group_id: group?.group_id }),
        firstAndLastPlanItemsForPlan({ planId })
      ]);
      setGroupMembers(membersResult.data);
      setDates([datesResult.data.first.date_due, datesResult.data.last.date_due]);
    }
    if (group && planId) init()
  }, [group, planId])

  return (
    <GroupContext.Provider value={{ group, groupMembers, planId, dates }}>
      {children}
    </GroupContext.Provider>
  )
}

export const useGroup = () => {
  return useContext(GroupContext)
}