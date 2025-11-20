import { PlayIcon } from "@hugeicons-pro/core-solid-rounded";
import { getDurationString } from "../../utility/format";
import { VerseAddendum } from "./VerseAddendum";

// VERSEACTIVTY = skeleton format thing
// {
//   comment: { count: 0, avatars: [] },
//   media: [{
//     activity_id: 0,
//     duration: 0,
//     thumbnail: '',
//   }],
// }

export default function VerseAddendumView({ 
  verseAddendums,
  backgroundColor,
  setState,

  location,
  verse,

  setSidebar,
}) {
  const handlePress = (type, params) => {
    if (type === 'media') {
      setSidebar(prev => ({
        ...prev,
        open: true,
        route: {
          type: 'media',
          verse: location?.verse,
          ...params,
        }
      }))
    } else if (type === 'comments') {
      setSidebar(prev => ({
        ...prev,
        open: true,
        route: {
          type: 'comments',
          verse: location?.verse,
        }
      }))
    }
  }

  return (
    <div style={styles.container}>
      {verseAddendums?.comment !== undefined &&
        verseAddendums?.comment?.count !== 0 && (
          <VerseAddendum
            avatars={verseAddendums.comment.avatars}
            text={
              verseAddendums.comment.count !== 1
                ? `${verseAddendums.comment.count} comments`
                : `1 comment`
            }
            background={backgroundColor}
            onPress={() => handlePress('comments')}
          />
        )}

      {verseAddendums?.media !== undefined &&
        verseAddendums?.media.length > 0 &&
        verseAddendums.media.map((media) => (
          <VerseAddendum
            key={`media-${media?.activity_id}`}
            avatars={[media.thumbnail]}
            icon={PlayIcon}
            text={media.duration === 0 ? 'open' : getDurationString(media.duration)}
            background={backgroundColor}
            onPress={() => handlePress('media', { activity_id: media.activity_id, media_path: media.media_path })}
          />
        ))}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    flex: 1,

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 7,
  }
}
