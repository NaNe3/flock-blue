import Carousell from '../components/Carousell';
import CircleInnunciated from '../components/CircleInnunciated';

export default function Features() {
  return (
    <div style={styles.featuresContainer}>
      <div className="full-screen">
        <Carousell direction='left'>
          <CircleInnunciated
            text={'GOD'}
            color1={'#0ba3ff'}
            color2={'#ff5964'}
          />
        </Carousell>
      </div>
    </div>
  )
}

const styles = {
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}