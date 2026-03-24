import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle01Icon, Clock01Icon, DashedLineCircleIcon, SquareLock02Icon } from "@hugeicons-pro/core-solid-rounded"

import BookCard from "../BookCard"
import Avatar from "../Avatar"

import { formatLocation } from "../../utility/format"
import { locationToURL } from "../../utility/read"
import { workColors } from "../../utility/colors"

import { useTheme } from "../../context/ThemeProvider"
import { useFont } from "../../context/FontProvider"
import { useGroup } from "../../context/GroupProvider"

export default function PlanItemAnalyticalCard({
  planItem,
}) {
  const { theme } = useTheme();
  const { font } = useFont(); 
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const navigate = useNavigate()

  const { groupMembers } = useGroup();

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

  const percentComplete = useMemo(() => {
    if (!planItem.completionists || planItem.completionists.length === 0) return 0;
    const percent = planItem.completionists?.length > 0 ? Math.floor((planItem.completionists?.length / groupMembers?.length) * 100) : 0
    return percent > 100 ? 100 : percent;
  }, [planItem, groupMembers])

  const percentColor = useMemo(() => {
    if (percentComplete === null || percentComplete === 0) return theme.red;
    if (percentComplete > 0 && percentComplete < 50) return theme.red;
    if (percentComplete >= 50 && percentComplete < 75) return theme.orange;
    if (percentComplete >= 75 && percentComplete < 100) return theme.green;
    if (percentComplete >= 100) return theme.blue;
  }, [percentComplete, theme])


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
        <div style={styles.planItemCompletionists}>
          {planItem.completionists && planItem.completionists.slice(0,3).map((avatarPath, index) =>(
            <Avatar
              key={avatarPath}
              imagePath={avatarPath}
              style={styles.avatar}
            />
          ))}
          {planItem.completionists && planItem.completionists.length > 3 && (
            <p style={styles.completionistsText}>+{
              planItem.completionists.length - 3
            }</p>
          )}
        </div>
        <p style={{ ...styles.planItemCompletion, color: percentColor }}>{percentComplete}% completed</p>
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

  planItemCompletion: {
    fontSize: 17,
    color: theme.red,
    ...font.bold,

    opacity: 0.6,
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
