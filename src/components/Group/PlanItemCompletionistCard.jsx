import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ClockIcon } from "@hugeicons-pro/core-solid-rounded"

import BookCard from "../BookCard"

import { formatLocation } from "../../utility/format"
import { locationToURL } from "../../utility/read"
import { workColors } from "../../utility/colors"

import { useTheme } from "../../context/ThemeProvider"
import { useFont } from "../../context/FontProvider"
import { msToMinSec } from "../../utility/time"

export default function PlanItemAnalyticalCard({
  planItem,
  log,
}) {
  const { theme } = useTheme();
  const { font } = useFont(); 
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const navigate = useNavigate()

  const handlePlanItemPress = () => {
    const plan = {
      plan_item_id: planItem.plan_item_id,
    }
    navigate(locationToURL(planItem, planItem.plan_id, planItem.plan_item_id), { state: { plan } })
  }

  const title = useMemo(() => {
    const location = {
      work: planItem?.work,
      book: planItem?.book,
      chapter: planItem?.chapter,
      verses: planItem?.verses,
    }
    return formatLocation(location)
  }, [planItem])

  const status = useMemo(() => {
    const isAfterDueDate = new Date(planItem.date_due) < new Date();    
    // const isCompleted = planItem.completionists && planItem.completionists.some(member => member.id === parseInt(completionistId))

    if (log) {
      return 'completed';
    } else if (isAfterDueDate) {
      return 'missing';
    } else {
      return null
    }
  }, [log])

  return (
    <div
      className="hover-opacity"
      style={styles.planItemRow}
      // onClick={handlePlanItemPress}
    >
      <BookCard
        width={28}
        text={planItem.work}
        colors={workColors[planItem.work]}
      />
      <div style={styles.planItemContent}>
        <p style={styles.planItemLocation}>{title}</p>
        <div style={styles.planItemInformation}>
          {log && (
            <div style={styles.piInformationItem}>
              <HugeiconsIcon
                icon={ClockIcon}
                size={16}
                color={theme.tertiaryText}
              />
              <p style={{ ...styles.piInformationText, width: 100 }}>{msToMinSec(log?.time_studied)}</p>
            </div>
          )}
          <p style={{ ...styles.piInformationText, color: status === 'completed' ? theme.blue : theme.red }}>{status}</p>
        </div>
      </div>
      {/* <div style={styles.planItemCompletionists}>
        {planItem.completionists && planItem.completionists?.slice(0,3).map((avatarPath, index) =>(
          <Avatar
            key={avatarPath}
            imagePath={avatarPath}
            style={styles.avatar}
          />
        ))}
        {planItem.completionists && planItem.completionists?.length > 3 && (
          <p style={styles.completionistsText}>+{
            planItem.completionists?.length - 3
          }</p>
        )}
      </div>
      <div style={styles.statusContainer}>
        { status === 'open' && ( <HugeiconsIcon icon={DashedLineCircleIcon} size={24} color={theme.tertiaryText} /> )}
        { status === 'completed' && ( <HugeiconsIcon icon={CheckmarkCircle01Icon} size={24} color={theme.blue} /> )}
        { status === 'locked' && ( <HugeiconsIcon icon={SquareLock02Icon} size={24} color={theme.tertiaryText} /> )}
      </div> */}
    </div>
  )
}

const style = (theme, font) => ({
  planItemRow: {
    display: 'flex',
    flexDirection: 'row',
    // padding: '15px',
    borderRadius: 15,
    // border: `1px solid ${theme.primaryBorder}`,
    gap: 20,

    alignItems: 'center',
  },
  planItemContent: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,

    gap: 30,
  },
  planItemLocation: {
    fontSize: 17,
    color: theme.actionText,
    ...font.bold,
  
    flex: 1,
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
    fontSize: 16,
    color: theme.tertiaryText,
    ...font.bold,
  },

  
  planItemCompletionists: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
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
    color: theme.tertiaryText,
    ...font.bold,
  },

  statusContainer: {
    height: 50,
    width: 50,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
