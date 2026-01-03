import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { fetchDateSpanOfPlanItems, getPlansUserIsStudying } from "../utility/db-plan";
import { templateStudySession } from "../utility/format";
import { getLogsByUserId } from "../utility/db-log";

import { useHolos } from "./HolosProvider";

const StudyContext = createContext();

export default function StudyProvider({ children }) {
  const { user } = useHolos();

  const [plans, setPlans] = useState([])
  const [planItems, setPlanItems] = useState({})
  const [processedDatesMap, setprocessedDatesMap] = useState({})
  const [logs, setLogs] = useState([])

  const aggregatedPlanIds = useMemo(() => plans.map(p => p.plan_id), [plans])

  useEffect(() => {
    const init = async () => {
      const { plans } = await getPlansUserIsStudying(user.id)

      const planItems = {}
      plans.forEach(plan => {
        if (planItems[plan.plan_id]) return
        planItems[plan.plan_id] = []
      })

      setPlans(plans)
      setPlanItems(planItems)

      const { data } = await getLogsByUserId(user.id)
      setLogs(data || [])
    }

    if (user) init()
  }, [])

  const handlePlanItemRetrieval = ({ planIds, initial_timestamp, final_timestamp }) => {
    // check if plan items need to be fetched
    handlePlanItemsAudit({ planIds, initial_timestamp, final_timestamp });

    // fetch plan items for these plans between these two timestamps
    const startDate = new Date(initial_timestamp);
    const endDate = new Date(final_timestamp);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const focusedPlanItems = planIds.reduce((acc, planId) => {
      if (planItems[planId]) {
        planItems[planId].forEach(item => {
          const itemDate = new Date(item.date_due);
          if (itemDate >= startDate && itemDate <= endDate) {
            acc.push(item);
          }
        });
      }
      return acc;
    }, []);

    return focusedPlanItems;
  }

  // check if plan items have been loaded for this plan between these two timestamps
  const handlePlanItemsAudit = async ({ planIds=[], initial_timestamp, final_timestamp }) => {
    const timestamps = [];
    const startDate = new Date(initial_timestamp);
    const endDate = new Date(final_timestamp);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      timestamps.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const planIdsToFetch = new Set();
    timestamps.forEach(date => {
      const dateKey = date.toISOString();
      planIds.forEach(planId => {
        if (!processedDatesMap[dateKey] || !processedDatesMap[dateKey].has(planId)) {
          planIdsToFetch.add(planId);
        }
      });
    });

    if (planIdsToFetch.size > 0) {
      console.log('FETCHING PLAN_ITEM DATA: ', Array.from(planIdsToFetch));
      const { data, error } = await fetchDateSpanOfPlanItems({ 
        planIds: Array.from(planIdsToFetch), 
        userId: user.id,
        initial_timestamp,
        final_timestamp
      });

      if (!error && data) {
        rectifyPlanState({ data, planIds, initial_timestamp, final_timestamp });
      }
    } else {
      console.log('ALL DATA IS AVAILABLE: ');
    }
  }

  const rectifyPlanState = ({ data, planIds, initial_timestamp, final_timestamp }) => {
    // update planItems state
    setPlanItems(prev => {
      const updated = { ...prev }
      data.forEach(item => {
        if (!updated[item.plan_id]) updated[item.plan_id] = []

        // avoid duplicates
        if (!updated[item.plan_id].some(pi => pi.plan_item_id === item.plan_item_id)) {
          updated[item.plan_id].push(item)
        }
      })
      return updated
    })

    // update map of checked dates
    setprocessedDatesMap(prev => {
      const updated = { ...prev }
      const startDate = new Date(initial_timestamp);
      const endDate = new Date(final_timestamp);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateKey = currentDate.toISOString();
        if (!updated[dateKey]) {
          updated[dateKey] = new Set()
        }
        planIds.forEach(planId => {
          updated[dateKey].add(planId);
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return updated
    })
  }

  const [studySession, setStudySession] = useState(templateStudySession)

  const handleSessionTerminate = () => {
    setStudySession(templateStudySession);
  }

  const contextValue = useMemo(() => ({
    plans,
    setPlans,
    aggregatedPlanIds,
    planItems,
    setPlanItems,

    handlePlanItemRetrieval,

    studySession,
    setStudySession,
    logs, 
    setLogs,
    handleSessionTerminate,
  }), [plans, aggregatedPlanIds, planItems, studySession, logs]);

  return (
    <StudyContext.Provider value={contextValue}>
      {children}
    </StudyContext.Provider>
  )
}

export const useStudy = () => {
  return useContext(StudyContext)
}