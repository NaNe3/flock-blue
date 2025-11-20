import { useMemo } from "react";
import { constants } from "../utility/colors";

export default function BookCard({ 
  text, 
  width, 
  colors
}) {
  const { background: primary, text: secondary } = colors || {};

  const cardStyles = useMemo(() => {
    return {
      ...styles.book,
      ...(primary ? { backgroundColor: primary } : {}),
      ...(width ? { width: width, height: width * 1.2, borderRadius: width * 0.17, padding: width * 0.07 } : {}),
    };
  }, [text, primary, width]);

  const cardText = useMemo(() => {
    const cardText = text.split(' ')
    // Calculate fontSize based on width, fallback to default if width is not provided
    const minFontSize = 1;
    const scaleFactor = 0.17;
    const baseFontSize = (width ? Math.max(minFontSize, width * scaleFactor) : 22) - 1;


    const cardTextStyles = {
      ...styles.bookText,
      fontSize: baseFontSize,
      ...(secondary ? { color: secondary } : {}),
    }

    if (cardText.length > 3) {
      return (
        <p style={cardTextStyles}>{text}</p>
      )
    } else {
      return cardText.map((word, idx) => (
        <p 
          key={idx} style={cardTextStyles}
        >
          {word}
        </p>
      ));
    }
  }, [text, secondary, width]);

  return (
    <div style={cardStyles}>
      { cardText }
    </div>
  );
}

const styles = {
  book: {
    width: 130,
    height: 155,
    padding: 2,
    borderRadius: 18,
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: constants.maroon,
  },
  bookText: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: constants.orange,
  },

  status: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}