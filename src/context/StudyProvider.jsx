import { createContext, useContext, useEffect, useState } from 'react';
import { findLogsOfThesePlanItemsForThisWeek, getPlanItemsOfCurrentWeek, getPlansUserIsStudying } from '../utility/db-plan';
import { useHolos } from './HolosProvider';

const StudyContext = createContext();

export const useStudy = () => {
  return useContext(StudyContext);
}

export default function StudyProvider({ children }) {
  const { user } = useHolos()

  const [plans, setPlans] = useState([])
  const [planItems, setPlanItems] = useState([])
  const [completionists, setCompletionists] = useState({})

  const getUserPlans = async () => {
    const { plans, error } = await getPlansUserIsStudying({ userId: user.id })
    if (error) return
    setPlans(plans)
  }

  const init = async () => {
    const { data, error } = await getPlanItemsOfCurrentWeek()
    if (error) return
    setPlanItems(data)

    if (user) {
      await getUserPlans()
    }

    await findCompletionists({ currentPlanItems: data })
  }
  
  useEffect(() => {
    init()
  }, [])

  const findCompletionists = async ({ currentPlanItems }) => {
    const piids = currentPlanItems.map(pi => pi.plan_item_id)
    // const allUserIds = [...new Set(friendIds.concat(groups.flatMap(group => group.members.map(member => member.id))))]

    const { data } = await findLogsOfThesePlanItemsForThisWeek({ planItemIds: piids })
    // const { data } = await findLogsOfThesePlanItemsForThisWeek({ planItemIds: piids, userIds: allUserIds })
    setCompletionists(data)
  }

  return (
    <StudyContext.Provider value={{ plans, planItems, completionists }}>
      {children}
    </StudyContext.Provider>
  );
}