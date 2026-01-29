import { useMemo } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { MultiplicationSignIcon } from "@hugeicons-pro/core-solid-rounded"

import FadeInView from "../FadeInView"
import Media from "../Media"
import VerseOverviewComments from "./VerseOverviewComments"

import { useTheme } from "../../context/ThemeProvider"

export default function ChapterSidebar({ 
  location,
  planInfo,  

  sidebar,
  setSidebar
}) {
  const { theme } = useTheme()
  const styles = useMemo(() => style(theme), [theme])

  const sidebarStyles = useMemo(() => ({
    ...styles.container,
    width: sidebar.open 
      ? 400
      : 0,
  }), [sidebar])

  const handleSidebarClose = () => {
    setSidebar(prev => ({
      ...prev,
      open: false,
      route: null,
    }))
  }

  return (
    <div style={sidebarStyles}>
      {sidebar.open && (
        <FadeInView style={styles.contentContainer}>
          {sidebar.route?.type === 'media' ? (
            <>
              <div style={styles.sidebarOptions}>
                <div 
                  className='circle-button'
                  onClick={handleSidebarClose}
                >
                  <HugeiconsIcon
                    icon={MultiplicationSignIcon}
                    size={24}
                    color={theme.primaryText}
                  />
                </div>
              </div>
              <Media 
                mediaPath={sidebar.route?.media_path}
                style={styles.media}
              />
            </>
          ) : (
            <VerseOverviewComments 
              location={{ ...location, verse: sidebar.route?.verse }} 
              planInfo={planInfo}
              setSidebar={setSidebar}
            />
          )}
        </FadeInView>
      )}
    </div>
  )
}

const style = (theme) => ({
  container: {
    height: '100vh',
    transition: '0.3s',

    position: 'sticky',
    top: 0,

    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  media: {
    width: 400,
    height: 530
  }
})
