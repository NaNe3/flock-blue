import { useMemo } from "react";
import { useStudy } from "../../context/StudyProvider";

export default function CurrentWeekDetails() {
  const { planItems } = useStudy();

  const thisWeekSpread = useMemo(() => {
    // get the date of this monday and the next sunday
    // if today is sunday, get the last monday and this sunday
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    const monday = new Date(today);
    const sunday = new Date(today);

    if (dayOfWeek === 0) {
      // If today is Sunday, go back 6 days to get last Monday
      monday.setDate(today.getDate() - 6);
    } else {
      // Otherwise, go back to the most recent Monday
      monday.setDate(today.getDate() - (dayOfWeek - 1));
    }
    sunday.setDate(monday.getDate() + 6);

    const options = { month: 'long', day: 'numeric' };
    const mondayStr = monday.toLocaleDateString('en-US', options);
    const sundayStr = sunday.toLocaleDateString('en-US', options)
      .replace(mondayStr.split(' ')[0], '').trim();

    return `${mondayStr} - ${sundayStr}`;
  }, [])

  const thisWeekContent = useMemo(() => {
    const current = planItems
    const firstItem = current?.[0]?.book === '' ? current?.[0]?.work : current?.[0]?.book
    const lastItem = current?.[current.length - 1]?.book === '' ? current?.[current.length - 1]?.work : current?.[current.length - 1]?.book
    const firstChapter = current?.[0]?.chapter
    const lastChapter = current?.[current.length - 1]?.chapter

    if (firstItem === lastItem) {
      return `${firstItem} ${firstChapter} - ${lastChapter}`
    } else {
      return `${firstItem} ${firstChapter} - ${lastItem} ${lastChapter}`
    }
  }, [planItems])
  return (
    <div style={styles.currentWeekDetails}>
      <p style={styles.currentWeekSpread}>{thisWeekSpread ?? ''}</p>
      <p style={styles.currentWeekContent}>{thisWeekContent ?? ''}</p>
    </div>
  )
}

const styles = {
  currentWeekDetails: {
    width: '100%',
    padding: '0px 15px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  currentWeekSpread: {
    fontSize: 18,
    fontWeight: '700',
    color: '#aaa',
  },
  currentWeekContent: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },

}