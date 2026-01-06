import { useMemo } from 'react';

import { constants } from '../../utility/colors';
import { msToMinSec } from '../../utility/time';

import { useStudy } from '../../context/StudyProvider';

export default function LogOverview() {
  const { logs, plans } = useStudy()

  const totalStudyTimeToday = useMemo(() => {
    const time =  logs.reduce((total, log) => total + log.time_studied, 0)
    return msToMinSec(time ?? 0)
  })

  const timeStudiedByWorkOrPlan = useMemo(() => {
    const bySource = {}

    const colors = [
      constants.blue,
      constants.purple,
      constants.orange,
      constants.red,
      constants.lightishRed,
      constants.lightRed,
      constants.lightBlue,
      constants.navy,
    ]

    logs.forEach(log => {
      const source = log.plan_id ? plans?.find(plan => plan.plan_id === log.plan_id)?.plan_name || 'Other' : log.work
      if (!bySource[source]) {
        bySource[source] = {
          time_studied: 0,
          color: colors[Object.keys(bySource).length % colors.length],
        }
      }
      bySource[source].time_studied += log.time_studied
    })
    
    return bySource
  })

  return (
    <div style={styles.goalContainer}>
      <div style={styles.goalBarTextRow}>
        <span style={styles.goalBarText}>{totalStudyTimeToday} read today</span>
        <span style={styles.goalBarText}>15m</span>
      </div>
      <div style={styles.goalBar}>
        {Object.entries(timeStudiedByWorkOrPlan).map(([source, content]) => {
          const totalTime = 900000
          const widthPercent = totalTime > 0 ? (content.time_studied / totalTime) * 100 : 0

          return (
            <div
              key={source}
              style={{...styles.goalBarFiller, width: `${widthPercent}%`, backgroundColor: content.color || constants.navy }}
            />
          )
        })}
      </div>
      {Object.keys(timeStudiedByWorkOrPlan)?.length > 0 && (
        <div style={styles.goalStatistics}>
          {Object.entries(timeStudiedByWorkOrPlan).slice(0,3).map(([source, content]) => (
            <div key={source} style={styles.goalStatistic}>
              <div style={styles.goalStatisticContent}>
                <div style={{...styles.goalColor, backgroundColor: content.color || constants.navy }} />
                <span style={styles.goalStatisticText}>{source}</span>
              </div>
              <span style={styles.goalStatisticValue}>{msToMinSec(content.time_studied)}</span>
            </div>
          ))}
          {Object.keys(timeStudiedByWorkOrPlan).length > 3 && (
            <span style={{...styles.goalStatisticValue, opacity: 0.7 }}>+{Object.keys(timeStudiedByWorkOrPlan).length - 3} more</span>
          )}
        </div>
      )}
    </div>
  )
}

const styles = {
  goalContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  goalBarTextRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  goalBarText: {
    fontSize: '16px',
    fontWeight: 800,
    color: '#2a2a2a',
  },
  goalBar: {
    width: '100%',
    height: '26px',
    border: `3px solid #2a2a2a`,
    borderRadius: '20px',
    backgroundColor: '#2a2a2a',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  },
  goalBarFiller: {
    height: '100%',
  },
  goalStatistics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  goalStatistic: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalStatisticContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  },
  goalColor: {
    width: '18px',
    height: '18px',
    borderRadius: '10px',
    border: `3px solid #2a2a2a`,
    backgroundColor: constants.navy,
  },
  goalStatisticText: {
    fontSize: '16px',
    color: '#2a2a2a',
    fontWeight: 700,
  },
  goalStatisticValue: {
    fontSize: '16px',
    color: '#2a2a2a',
    fontWeight: 800,
  },
  totalTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    marginTop: '15px',
    opacity: 0.8
  },
  totalTimeText: {
    fontSize: '16px',
    color: '#2a2a2a',
    fontWeight: 800,
  },
}
