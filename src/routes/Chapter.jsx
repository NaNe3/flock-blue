import { useEffect, useMemo, useRef, useState } from "react";

import VerseContainer from "../components/Library/VerseContainer";

import { getVersesFromChapter } from "../utility/read";
import { formatScriptureString } from "../utility/format";

import { useDashboard } from "../context/DashboardProvider";
import { useHolos } from "../context/HolosProvider";
import FadeInView from "../components/FadeInView";

export default function Chapter({ 
  location,
  sidebar,
  setSidebar
}) {
  const { user } = useHolos()
  const { dashboard, setDashboard, expandedWidth } = useDashboard()

  const [verses, setVerses] = useState({});
  const [chapterTitle] = useState(formatScriptureString(location.book === "" || !location.book ? location.work : location.book) + " " + location.chapter)
  const [chapterSubtitle, setChapterSubtitle] = useState('');

  const range = useRef('');
  const statistics = useRef({
    words_read: -1,
    verses_read: -1,
    total_user_words: -1,
    total_user_verses: -1,
    time_started: -1,
  });
  
  useEffect(() => {
    const init = async () => {
      // get verses, chapter subtitle, and chapter statistics
      await getChapterInformation()
      // log that the user has visited this chapter in local storage
      // await updateReadingHistory({ work: location?.work, book: location?.book, chapter: location?.chapter })

      // initialize study session if not already started
      // updateStudySession()
    }

    // This is set to 300ms to allow the screen transition animation to complete smoothly

    if (dashboard.width !== expandedWidth) {
      setDashboard(prev => ({
        ...prev,
        width: expandedWidth,
      }))
    }

    setTimeout(() => {
      init()
    }, 300)
  }, [])

  const getChapterInformation = async () => {
    // get verses in chapter or plan item

    const verses = await getVersesFromChapter({ work: location.work, book: location.book, chapter: location.chapter, selection: location?.verses });
    setVerses(verses)

    // get subtitle for chapter
    // if (plan !== null && planItem?.verses !== null) {
    //   setChapterSubtitle(`verses ${planItem?.verses}`)
    //   range.current = planItem?.verses
    // } else {
      const firstVerse = Object.keys(verses).filter(key => !isNaN(key))[0];
      const lastVerse = Object.keys(verses).filter(key => !isNaN(key)).reverse()[0];      

      const totalVerses = Object.keys(verses).filter(key => !isNaN(key)).length;
      setChapterSubtitle(
        location?.verses
          ? location?.verses.includes('-')
            ? `verses ${location.verses}`
            : `verse ${location.verses}`
          : firstVerse === lastVerse 
            ? `verse ${firstVerse}` 
            : `verses ${firstVerse}-${lastVerse}` 
      )
      range.current = `1-${totalVerses}`
    // }

    // get chapter statistics
    if (verses && (statistics.current.words_read === -1 || statistics.current.verses_read === -1)) {
      const all = Object.keys(verses)
      const total = all.reduce((acc, key) => {
        return acc + verses[key].split(" ").length
      }, 0)
    
      statistics.current.words_read = total
      statistics.current.verses_read = all.length
    }

    if (user.words_read !== undefined && (statistics.current.total_user_words === -1 || statistics.current.total_user_verses === -1)) {
      statistics.current.total_user_words = user.words_read
      statistics.current.total_user_verses = user.verses_read
    }

    statistics.current.time_started = new Date().getTime()
  }

  const chapterTitleStyling = useMemo(() => ({
    ...styles.chapterHeading,
    ...(chapterTitle ? {
      fontSize: chapterTitle.length < 9
        ? 48 : chapterTitle.length < 13
          ? 40 : 28
    } : {})
  }), [])

  return (
    <div style={styles.container}>
      <div style={styles.landingContainer}>
        <p style={chapterTitleStyling}>{chapterTitle}</p>
        {chapterSubtitle && (
          <FadeInView>
            <p style={styles.chapterSubheading}>{chapterSubtitle}</p>
          </FadeInView>
        )}
      </div>
      <VerseContainer
        work={location.work}
        book={location.book}
        chapter={location.chapter}
        chapterSubtitle={chapterSubtitle}
        verses={verses}
        // plan={plan}
        // planItem={planItem}
        // initialVerse={initialVerse}

        sidebar={sidebar}
        setSidebar={setSidebar}
      />
    </div>
  )
}

const styles = {
  container: {
    width: 500,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  landingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 100,
  },
  chapterHeading: {
    fontSize: 40,
    fontWeight: 800,
    textAlign: 'center',
    color: '#fff',
  },
  chapterSubheading: {
    color: '#aaa',
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 0,
  },
}