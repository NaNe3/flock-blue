import React, { useEffect } from 'react'


// import appleHD from '../assets/apple-hd.png'
// import play from '../assets/play.png'

export default function Share() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [])

  return (
    <>
      <div className="landing">
        <h3 id="header">flock</h3>
        <h3 id="subheader">because growing closer to GOD was never meant to be done alone</h3>
      </div>

      <div className="body">
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 200 }}>
          {/* <img src={appleHD} className="link-image" />
          <img src={play} className="link-image" /> */}
        </div>
      </div>
    </>
  )
}