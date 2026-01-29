import { useMemo, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { URLtoLocation } from "../utility/read"

import Chapter from "./Chapter"
import ChapterSidebar from "../components/Library/ChapterSidebar"

import { useTheme } from "../context/ThemeProvider"
import { useStudy } from "../context/StudyProvider"

export default function ChapterDashboard() {
  const parameters = useParams()
  const [searchParams] = useSearchParams()
  const location = useMemo(() => URLtoLocation(parameters), [parameters])

  const { theme } = useTheme();
  const styles = useMemo(() => style(theme), [theme]);

  const { plans, planItems } = useStudy();

  const [sidebar, setSidebar] = useState({
    open: false,
    route: null,
  })

  const planInfo = useMemo(() => {
    if (!searchParams.get('pid') || !searchParams.get('piid')) return null;
    const planItem = planItems[parseInt(searchParams.get('pid'))]?.find(item => item.plan_item_id === parseInt(searchParams.get('piid')))
    const groupId = plans?.find(plan => plan.plan_id === parseInt(searchParams.get('pid')))?.group_id ?? null;

    return {
      plan_id: searchParams.get('pid') ? parseInt(searchParams.get('pid')) : null,
      plan_item_id: searchParams.get('piid') ? parseInt(searchParams.get('piid')) : null,
      planItem: planItem,
      group_id: groupId,
    }
  }, [planItems, searchParams]);


  const props = useMemo(() => ({
    location,
    sidebar,
    setSidebar,
    planInfo,
  }), [location, sidebar, planInfo]);

  return (
    <div style={styles.container}>
      <div style={styles.left} />
      <Chapter {...props} />
      <ChapterSidebar {...props} />
    </div>
  )
}

const style = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,

    minHeight: '101vh',
    width: '100%',

    borderLeft: `1px solid ${theme.primaryBorder}`,
  },

  left: {
  },

  sidebarRight: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
