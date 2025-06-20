import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft04Icon, ArrowRight02Icon, Cancel01Icon } from '@hugeicons-pro/core-solid-rounded'
import { useHolos } from '../context/HolosProvider'

import './Account.css'

export default function Account() {
  const { color } = useHolos()
  const [viewingRoute, setViewingRoute] = useState(null)

  const DeleteAccount = () => (
    <div className='route-container'>
      <h1 style={styles.routeTitle}>DELETE ACCOUNT</h1>
      <div className="stepRow">
        <h1>step 1.</h1>
        <h1>maybe consider not doing it... :(</h1>

        <h1>step 2.</h1>
        <h1>
          search for the "destroy account" link in the account settings of your flock app. We are sorry to see you go!
        </h1>
      </div>
    </div>
  )

  const DeleteData = () => (
    <div className='route-container'>
      <h1 style={styles.routeTitle}>DELETE DATA</h1>
      <div className="stepRow">
        <h1>step 1.</h1>
        <h1>open the flock app</h1>

        <h1>step 2.</h1>
        <h1>
          send a message to the flock support team via the app and tell us what you want to delete. We will take care of it for you!
        </h1>
      </div>
    </div>
  )

  const ReportStolen = () => (
    <div className='route-container'>
      <h1 style={styles.routeTitle}>REPORT STOLEN</h1>
      <div className="stepRow">
        <h1>step 1.</h1>
        <h1>prepare yourself for the best customer service ever!</h1>

        <h1>step 2.</h1>
        <h1>
          send us an email at support@lingerlonger.io and we will start speaking with you about the next steps. We are here to help!
        </h1>
      </div>
    </div>
  )

  const routes = {
    deleteAccount: <DeleteAccount />,
    deleteData: <DeleteData />,
    reportStolen: <ReportStolen />
  }

  return (
    <div className="account-container">
      <div className="full-screen account-landing">
        {viewingRoute !== null && (
          <>
            { routes[viewingRoute] }
            <div className='back-button' onClick={() => setViewingRoute(null)}>
              <HugeiconsIcon
                icon={ArrowLeft04Icon}
                size={15}
                color="#fff"
              />
              <p className='back-text'>
                { viewingRoute === 'deleteAccount' && 'keep studying!' }
                { viewingRoute === 'deleteData' && 'return to list!' }
                { viewingRoute === 'reportStolen' && 'mmmmm.. lets go back' }
              </p>
            </div>
          </>
        )}
        {viewingRoute === null && (
          <>
            <div style={styles.accountHeadingBlock}>
              {/* <HugeiconsIcon
                icon={UserCircleIcon}
                size={150}
                color="#ccc"
              /> */}
              <h1 className="account-title" style={{ color }}>account stuff</h1>
            </div>
            <div className='option-block'>
              <div className='option-row' onClick={() => setViewingRoute('deleteAccount')}>
                <p className='option-text'>delete account</p>
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={25}
                  color="#fff"
                />
              </div>
              <div className='option-row' onClick={() => setViewingRoute('deleteData')}>
                <p className='option-text'>delete some data</p>
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={25}
                  color="#fff"
                />
              </div>
              <div className='option-row' onClick={() => setViewingRoute('reportStolen')}>
                <p className='option-text'>report account stolen</p>
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={25}
                  color="#fff"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className='mini-scroll-section'>
        <div className="full-screen sticky">
          <h1 className='account-verse'>"Feed the flock of God which is among you, taking the oversight thereof, not by constraint, but willingly; not for filthy lucre, but of a ready mind; Neither as being lords over God's heritage, but being ensamples to the flock."</h1>
          <h1>1 Peter 5:2-3</h1>
        </div>
      </div>
    </div>
  )
}

const styles = {
  accountHeadingBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 0'
  },
  verse: {
    fontSize: '30px',
    textAlign: 'center',
    margin: '20px 0',
    color: '#ccc'
  },
  routeTitle: {
    fontSize: '35px',
    textAlign: 'center',
    margin: '50px 0',
    color: '#ccc'
  }
}