import { useEffect } from 'react';
import './CommunityGuidlines.css';
import './Legal.css';
import TextInnunciated from '../../components/TextInnunciated';


export default function CommunityGuidlines() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [])

  return (
    <>
      <div className='full-screen legal-landing'>
        <div className='legal-emoji-box'>
          <p className='legal-emoji'>🕊️</p>
        </div>
        <h3 className='legal-header'>community guildlines</h3>
        <h3 className='legal-subheader'>lets build up the Kingdom of God together</h3>
      </div>
      <div className='legal-content'>
        <div className='full-screen guidlines-content'>
          {/* <h2>a community of followers</h2> */}
          <TextInnunciated 
            color={"#ff5964"}
            text={"A community of followers"}
          />
          <p className='guidlines-text'>We believe that everyone deserves to strengthen their relationship with God. Flock was created to lower the barriers surrounding both personal and group scripture study. Thus creating an environment where all may enjoy the fruits of gospel living. This platform was created to fulfill and amplify the promises found in D&C 130:2 and D&C 88:81.</p>
          {/* D&C 130:2 and D&C 88:81. */}
          <div className='scripture-box'>
            <p className='scripture'>And that same sociality which exists among us here will exist among us there, only it will be coupled with eternal glory, which glory we do not now enjoy.</p>
            <p className='reference'>D&C 130:2</p>
            <p className='scripture'>Behold, I sent you out to testify and warn the people, and it becometh every man who hath been warned to warn his neighbor.</p>
            <p className='reference'>D&C 88:81</p>
          </div>
        </div>
        <div className='full-screen guidlines-content'>
          <TextInnunciated 
            color={"#1dd1a1"}
            text={"Respect others"}
          />
          <p className='guidlines-text'>We believe that all deserve the respect commensurate with their  divine birthright. Therefore, we cannot tolerate any willful harassment, judgement, or disrespect levied against another user. Please remember the words of the great teacher Confucius</p>
          <div className='scripture-box'>
            <p className='scripture'>What you do not wish for yourself, do not do to others</p>
            <p className='reference'>Analects 15:23</p>
          </div>
        </div>
        <div className='full-screen guidlines-content'>
          <TextInnunciated 
            color={"#b95cf4"}
            text={"Serve and teach"}
          />
          <p className='guidlines-text'>We believe that you are not on this app by coincidence. Through your faithful study of the scriptures, you have the unique opportunity to share your testimony with friends, family, and strangers. Please treat this experience as a way to</p>
          <div className='scripture-box'>
            <p className='scripture'>Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best</p>
            <p className='reference'>Surah An-Nahl 16:125</p>
          </div>
        </div>
        <div className='full-screen guidlines-content'>
          <TextInnunciated
            color={"#ff9f1c"}
            text={"Diversity of religious belief"}
          />
          <p className='guidlines-text'>We believe that everyone has the obligation to share the spirit with which they have been blessed. However this must be done diplomatically. Keep in mind that you are a representative of your faith and your God when you share with others. Do you really believe that your audience will be receptive if you do not respect those you speak with? Always interact with others with the goal to uplift rather than destroy.</p>
          <div className='scripture-box'>
            <p className='scripture'>Let no corrupt communication proceed out of your mouth, but that which is good to the use of edifying, that it may minister grace unto the hearers</p>
            <p className='reference'>Ephesians 4:29</p>
          </div>
        </div>
        <div className='full-screen guidlines-content'>
          <TextInnunciated
            color={"#f368e0"}
            text={"Use your brain"}
          />
          <p className='guidlines-text'>Your loving Creator has endowed you with the ability to reason. So do it. Always keep in mind the responsibility you have; do not attempt to find ways around the rules of this platform. Anything violating the spirit of these guidelines will result in some action decided upon by a judicial board of Linger Longer inc.</p>
          <div className='scripture-box'>
            <p className='scripture'>The law of cause and effect never fails; those who act wrongly shall reap the fruit of their actions</p>
            <p className='reference'>Rig Veda 10.129.7</p>
          </div>
        </div>

      </div>
    </>
  )
}