import { ArrowLeft01Icon, ArrowLeft02Icon } from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"
import { useNavigate } from "react-router-dom"

export default function SimpleHeader({ 
  title='', 
  style={},
  rightComponent=null
}) {
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
            color="#FFF"
          />
        </div>
        <h1 style={styles.title}>{title}</h1>

      </div>
      {rightComponent}
    </div>
  )
}

const styles = {
  header: {
    width: '100%',
    padding: '7px 10px',

    position: 'sticky',
    top: 0,
    zIndex: 2,

    // backgroundColor: '#0a0a0a',
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
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
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: '#FFF',
  }
}