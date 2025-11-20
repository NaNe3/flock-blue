import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import VerseAddendumView from "./VerseAddendumView"

import { getVersesWithActivity } from "../../utility/db-chapter"

import { useHolos } from "../../context/HolosProvider"
import { useStudy } from "../../context/StudyProvider"
import FadeInView from "../FadeInView"

export default function VerseContainer({
  onNavigate,
  scrollViewRef,
  work,
  book,
  chapter,
  verses,
  chapterSubtitle,
  plan,
  planItem,
  initialVerse = null,

  sidebar,
  setSidebar,
}) {
  const { user } = useHolos()

  // Temporary placeholders until hooks are implemented
  const collections = []
  const publishError = (error) => console.error('Error:', error)

  const containerRef = useRef(null)
  const verseRefs = useRef({})
  const [versePositions, setVersePositions] = useState({})

  const [uniqueVersesWithActivity, setUniqueVersesWithActivity] = useState({})
  const [uniqueVersesWithBookmarks, setUniqueVersesWithBookmarks] = useState({})
  const [uniqueVersesWithFootnotes, setUniqueVersesWithFootnotes] = useState({})
  const [summaryBlocks, setSummaryBlocks] = useState({})

  const returnToModal = useRef(null)

  // realtime activity
  // useEffect(() => {
  //   const trigger = async () => { await loadMedia() }
  //   if (media.length > 0 && media !== initialMediaLoaded.current) { trigger() }
  // }, [media])

  const init = async () => {
    // wait 500 milliseconds to allow verses to render
    setTimeout(() => { measureAllVerses() }, 500)

    // console.log('returnToModal: ', returnToModal.current);
    if (returnToModal.current) {
      openCollectionList(returnToModal.current);
      returnToModal.current = null;
    }

    // if (plan && (planItem?.summary || planItem?.context)) {
    //   if (planItem?.summary) {
    //     // create verse blocks
    //     let summary = {}

    //     const summaryBlocks = planItem.summary.split('; ')
    //     summaryBlocks.forEach((block, index) => {
    //       const match = block.match(/\d+/)
    //       const firstNumber = match ? match[0] : '-1'
    //       summary[firstNumber] = block
    //     })
    //     setSummaryBlocks(summary)
    //   } else if (planItem.context) {
    //     setSummaryBlocks({ '0': planItem.context })
    //   }
    // }

    await loadMedia()
    // await loadBookmarks()
  }

  const measureAllVerses = async () => {
    // Web implementation for measuring verse positions
    const measurements = {}
    Object.keys(verseRefs.current).forEach(verseKey => {
      const element = verseRefs.current[verseKey]
      if (element) {
        const rect = element.getBoundingClientRect()
        measurements[verseKey] = {
          y: rect.top + window.scrollY,
          height: rect.height
        }
      }
    })
    setVersePositions(measurements)

    if (initialVerse) {
      const position = measurements?.[initialVerse]
      if (position && scrollViewRef?.current) {
        scrollViewRef.current.scrollTo({ top: position.y, behavior: 'smooth' })
      }
    }
  }

  const loadMedia = async () => {
    // let scholars = []
    // if (plan) scholars = (await getScholarsFromPlan(plan.plan_info.plan_id)).map(scholar => scholar.id)
    // const focusIds = [...friendIds, ...scholars]
    // const focusIds = friendIds

    const { data, error } = await getVersesWithActivity({ work, book, chapter })
    // const { data, error } = await getVersesWithActivity({ work, book, chapter, userId, focusIds, groupIds })
    if (!error) {
      const versesWithActivity = findUniqueVersesWithActivity(data)
      setUniqueVersesWithActivity(versesWithActivity)
    } else {
      setUniqueVersesWithActivity({})

      // publishError({
      //   message: 'error loading activity',
      //   reason: error,
      // })
    }
  }

  const loadBookmarks = async () => {
    const collectionIds = collections.map(collection => collection.collection_id)
    const { data, error } = await getBookmarksByLocation({ work, book, chapter, userId, collectionIds })
  
    if (!error) {
      const versesWithBookmarks = {}
      data.forEach(item => {
        if (!versesWithBookmarks[item.verse]) {
          versesWithBookmarks[item.verse] = []
        }
        versesWithBookmarks[item.verse].push(item)
      })
      setUniqueVersesWithBookmarks(versesWithBookmarks)
    } else {
      publishError({
        message: 'Error loading bookmarks',
        reason: error,
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  const findUniqueVersesWithActivity = (activity) => {
    const uniqueVerses = {}
    activity.forEach(item => {
      if (uniqueVerses[item.verse] === undefined) {
        uniqueVerses[item.verse] = {
          comment: { count: 0, avatars: [] },
          media: [],
        }
      }

      const type = item?.media?.duration !== undefined ? 'media' : 'comment'
      if (type === 'media') {
        uniqueVerses[item.verse].media.push({
          activity_id: item.activity_id,
          duration: item.media.duration,
          media_path: item.media.media_path,
          thumbnail: item.user.avatar_path,
        })
      } else {
        uniqueVerses[item.verse].comment.count += 1
        // avatar exists, avatar not already in the list, and less than 3 avatars
        if (item?.user?.avatar_path && uniqueVerses[item.verse].comment.avatars.indexOf(item.user.avatar_path) === -1 && uniqueVerses[item.verse].comment.avatars.length < 3) {
          uniqueVerses[item.verse].comment.avatars.push(item.user.avatar_path)
        }
      }
    })
    return uniqueVerses
  }

  const handleSuccessfulBookmark = (request) => {
    if (!request && !request?.data) return;

    const verseBookmarks = uniqueVersesWithBookmarks[request?.location?.verse] || []
    if (request.type === 'add') {
      setUniqueVersesWithBookmarks(prev => {
        const value = [ ...verseBookmarks, ...request.data ]
        return { ...prev, [request?.location?.verse]: value }
      });
    } else if (request.type === 'remove') {
      setUniqueVersesWithBookmarks(prev => {
        const value = verseBookmarks.filter(bookmark => bookmark.collection_item_id !== request.data.collection_item_id)
        return { ...prev, [request?.location?.verse]: value }
      });
    }
  }

  const lastClick = useRef(null)
  const handleDoubleClick = (keyInt) => {
    const now = Date.now();
    const DOUBLE_CLICK_DELAY = 300;
    
    if (lastClick.current && (now - lastClick.current) < DOUBLE_CLICK_DELAY) {
      // Double click detected
      openCollectionList(keyInt);
      lastClick.current = null;
      returnToModal.current = keyInt;
    } else {
      // First click
      lastClick.current = now;
    }
  }

  const handleVersePress = (verse) => {
    // Web alternative to haptic feedback - could use Web Vibration API if needed
    // navigator.vibrate && navigator.vibrate(50)

    // workaround: the returnToModal value would trigger the modal to open after returning from VerseOverviewPage
    // right now each time you leave the page to return to Chapter, the bottomsheet will reappear
    // if the future, find a more permanent solution
    returnToModal.current = null

    if (onNavigate) {
      onNavigate('VerseOverviewPage', {
        location: { work, book, chapter, verse }, 
        verse: verses[verse],
        addendum: uniqueVersesWithActivity[verse],
        bookmarks: uniqueVersesWithBookmarks[verse],
      })
    }
  }

  return (
    <div ref={containerRef} style={styles.verseContainer}>
      {verses && 
        <div>
          {/* IN THE CASE OF plan.context */}
          {/* { verses['heading'] !== undefined && (
            <VerseSummary 
              key={`summary-${0}-heading`}
              summary={verses['heading']} 
              style={styles.summary} 
            />
          )}
          {summaryBlocks['0'] !== undefined && (
            <VerseSummary 
              key={`summary-${0}-heading`}
              summary={summaryBlocks['0']} 
              style={styles.summary} 
            />
          )} */}
          {Object.entries(verses).map(([key, verse], index) => {
            if (key === 'heading') return null

            const keyInt = parseInt(key)
            const verseAddendums = {
              ...(uniqueVersesWithActivity[key] || {}),
              ...(uniqueVersesWithFootnotes[key] || {})
            }

            return (
              <div key={`verse-container-${index}`}>
                {/* {summaryBlocks[key.toString()] !== undefined && (
                  <VerseSummary
                    key={`summary-${index}`}
                    summary={summaryBlocks[key]}
                    style={styles.summary}
                  />
                )} */}
                <div
                  key={`verse-${index}`} 
                  style={styles.verseBox}
                  ref={(ref) => { verseRefs.current[keyInt] = ref }}
                >
                  <FadeInView
                    onClick={() => handleDoubleClick(keyInt)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      handleVersePress(keyInt)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <p style={styles.verse}>{key} {verse}</p>
                  </FadeInView>
                  {!Object(verseAddendums).empty && (
                    <FadeInView style={styles.addendumContainer}>
                      <VerseAddendumView 
                        onNavigate={onNavigate}
                        verseAddendums={verseAddendums} 
                        location={{ work, book, chapter, verse: keyInt }}
                        verse={verse}

                        setSidebar={setSidebar}
                      />
                    </FadeInView>
                  )}
                  {/* {uniqueVersesWithBookmarks[key] && uniqueVersesWithBookmarks[key].length > 0 && (
                    <VerseBookmark bookmarks={uniqueVersesWithBookmarks[key]} />
                  )} */}
                </div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

const styles = {
  verseContainer: {
    paddingBottom: '50px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  verseBox: {
    marginBottom: '30px',
  },
  verse: {
    fontSize: '22px',
    fontWeight: '700',  
    color: '#fff',
    lineHeight: 1.4,
  },
  addendumContainer: {
    marginTop: '10px',
  }
}
