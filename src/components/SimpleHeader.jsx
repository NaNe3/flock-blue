import { useMemo } from "react";
import { useNavigate } from "react-router-dom"

import { ArrowLeft02Icon } from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"

import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function SimpleHeader({ 
  title='', 
  style={},
  rightComponent=null
}) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => handleStyle(theme, font), [theme, font]);

  const navigate = useNavigate();  

  const handleNavigateBack = () => {
    navigate(-1);
  }  

  return (
    <div style={{
      ...styles.header,
      ...style
    }}>
      <div style={styles.headerContent}>
        <div 
          className="circle-button"
          style={styles.backButton}
          onClick={handleNavigateBack}
        >
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            size={20}
            color={theme.actionText}
          />
        </div>
        <h1 style={styles.title}>{title}</h1>

      </div>
      {rightComponent}
    </div>
  )
}

const handleStyle = (theme, font) => ({
  header: {
    width: '100%',
    padding: '7px 10px',

    position: 'sticky',
    top: 0,
    zIndex: 2,

    backgroundColor: theme.primaryBackground,
    border: `1px solid ${theme.primaryBorder}`,
    borderRadius: 60,
    backdropFilter: 'blur(10px)',

    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5
  },
  backButton: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 20,
    color: theme.primaryText,
    ...font.regular,

    margin: 0,
  }
})
