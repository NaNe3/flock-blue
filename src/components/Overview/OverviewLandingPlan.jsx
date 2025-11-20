import { useMemo } from "react"

import { useStudy } from "../../context/StudyProvider"

import CurrentWeekDetails from "./CurrentWeekDetails"
import PlanItemCard from "./PlanItemCard"
import FadeInView from "../FadeInView"
import BookCard from "../BookCard"

export default function OverviewLandingPlan() {
  const { plans, planItems, completionists } = useStudy()

  const currentPlan = useMemo(() => {
    return plans.find((plan) => plan.plan_id === 1)
  }, [plans]) 

  const currentPlanItem = useMemo(() => {
    const selectedPlanItems = planItems
    const lastStudiedPlanItem = selectedPlanItems?.find(pi => pi.plan_item_id === plans[currentPlan?.plan_id]?.last_studied)
    
    let currentPlanItem = null
    if (!lastStudiedPlanItem) {
      currentPlanItem = selectedPlanItems[0]
    } else {
      const lastStudiedPlanItemIndex = selectedPlanItems?.findIndex(pi => pi.plan_item_id === lastStudiedPlanItem?.plan_item_id)
      currentPlanItem = selectedPlanItems[lastStudiedPlanItemIndex + 1]
    }

    return currentPlanItem
  }, [planItems, currentPlan])

  return (
    <FadeInView style={styles.container}>
      <div style={{ padding: '0 10px' }}>
        <BookCard
          width={100}
          text="Come Follow Me"
        />
      </div>

      <CurrentWeekDetails />

      <div style={styles.currentWeekPlanItems}>
        {planItems.map((item) => (
          <PlanItemCard
            key={item.plan_item_id}
            planItem={item}
            currentPlanItemId={currentPlanItem?.plan_item_id}
            completionists={completionists}
          />
        ))}
      </div>
    </FadeInView>
  )
}

const styles = {
  container: {
    display: 'flex',    
    width: '100%',

    flexDirection: 'column',
    gap: 40,
  },

  planName: {
    fontSize: 38,
    fontWeight: '800',
    color: '#aaa',
  },

  currentWeekPlanItems: {
    display: 'flex',
    flexDirection: 'column',
    // gap: 20,
  },
  
}