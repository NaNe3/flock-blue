import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle01Icon, Clock01Icon, SquareLock02Icon } from "@hugeicons-pro/core-solid-rounded"

import { formatScriptureString } from "../../utility/format"
import { locationToURL } from "../../utility/read"
import { workColors } from "../../utility/colors"

import BookCard from "../BookCard"
import Avatar from "../Avatar"

export default function PlanItemCard({
  planItem,
  currentPlanItemId,
  completionists
}) {
  const navigate = useNavigate()

  const handlePlanItemPress = () => {
    const plan = {
      plan_item_id: planItem.plan_item_id,
    }
    navigate(locationToURL(planItem), { state: { plan } })
  }

  const planItemLocation = useMemo(() => {
    return formatScriptureString(`${planItem.work} ${planItem.chapter}${planItem.verses && `:${planItem.verses}` }`)
  })

  return (
    <div
      className="hover-background"
      style={styles.planItemRow}
      onClick={handlePlanItemPress}
    >
      <BookCard
        width={45}
        text={planItem.work}
        colors={workColors[planItem.work]}
      />
      <div style={styles.planItemContent}>
        <p style={styles.planItemLocation}>{planItemLocation}</p>
        <div style={styles.planItemInformation}>
          <div style={styles.piInformationItem}>
            <HugeiconsIcon icon={Clock01Icon} size={16} color="#555" />
            <p style={styles.piInformationText}>{planItem.time} minutes</p>
          </div>
        </div>
      </div>
      <div style={styles.planItemCompletionists}>
        {completionists[planItem.plan_item_id] && completionists[planItem.plan_item_id].slice(0,3).map((item, index) =>(
          <Avatar
            key={item.avatar_path}
            imagePath={item.avatar_path}
            style={styles.avatar}
          />
        ))}
        {completionists[planItem.plan_item_id] && completionists[planItem.plan_item_id].length > 3 && (
          <p style={styles.completionistsText}>+{
            completionists[planItem.plan_item_id].length - 3
          }</p>
        )}
      </div>
      <div style={styles.statusContainer}>
        {currentPlanItemId !== planItem.plan_item_id && (
          <HugeiconsIcon
            icon={
              currentPlanItemId < planItem.plan_item_id
                ? SquareLock02Icon
                : CheckmarkCircle01Icon
            }
            size={22}
          />
        )}
      </div>
    </div>

  )
}

const styles = {
  planItemRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '15px',
    borderRadius: 15,
    gap: 20,

    alignItems: 'center',
  },
  planItemContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  planItemLocation: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ddd',
  },
  planItemInformation: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  piInformationItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  piInformationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
  },

  
  planItemCompletionists: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 20,

    display: 'flex',
    flexShrink: 0,
  },
  completionistsText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#999',
  },

  statusContainer: {
    height: 50,
    width: 50,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}