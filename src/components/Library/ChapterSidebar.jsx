import { useMemo } from "react"

import FadeInView from "../FadeInView"
import Media from "../Media"
import VerseOverviewComments from "./VerseOverviewComments"

import { HugeiconsIcon } from "@hugeicons/react"
import { MultiplicationSignIcon } from "@hugeicons-pro/core-solid-rounded"

export default function ChapterSidebar({ 
  location,
  sidebar,
  setSidebar
}) {

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
                    color="#fff"
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
              setSidebar={setSidebar}
            />
          )}
        </FadeInView>
      )}
    </div>
  )
}

const styles = {
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
}