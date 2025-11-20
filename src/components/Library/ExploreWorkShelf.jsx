import { useEffect, useState } from "react"

import BookShelf from "./BookShelf"

import { getRecommendedPlans } from "../../utility/db-plan"

export default function ExploreWorkShelf() {
  const [plans, setPlans] = useState([])
  
  useEffect(() => {
    const init = async () => {
      const { data, error } = await getRecommendedPlans()
      console.log("Recommended plans:", data, error)

      if (!error) {
        const formattedData = data.map(plan => ({
          text: plan.plan_name,
          colors: {
            background: plan.primary.color_hex,
            text: plan.secondary.color_hex
          }
        }))

        setPlans(formattedData)
      }
    }
    init()
  }, [])

  if (plans.length === 0) return null

  return (
    <div className="fade-in-view">
      <BookShelf
        title="Explore Recommended Plans"
        books={plans}
      />
    </div>
  )
}
