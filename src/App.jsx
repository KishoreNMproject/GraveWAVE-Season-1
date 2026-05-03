import { useEffect, useState } from 'react'
import './App.css'

const AdUnit = ({ slot, style = {} }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="ad-container" style={style}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-2611476100664915"
           data-ad-slot={slot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

function App() {
  const [chapters, setChapters] = useState([])
  const genImgs = [
    "ch1_blackout.png", "ch2_reunion.png", "ch3_omen.png", "ch4_veil.png",
    "ch5_sentinels.png", "ch6_blood_bait.png", "ch7_fractured.png", "ch8_vortex.png",
    "ch9_oath.png", "ch10_finale.png", "pc1_mia.png", "pc2_awakening.png"
  ]

  useEffect(() => {
    fetch('/novel_structured.json')
      .then(res => res.json())
      .then(data => setChapters(data))
  }, [])

  let imgIdx = 0;

  return (
    <div className="app-container">
      <header className="novel-header">
        <h1 className="main-title">GRAVEWAVE</h1>
        <p className="subtitle">THE ULTIMATE EDITION | [NANA BANANA ENCRYPTED]</p>
      </header>

      <AdUnit slot="header-ad" style={{ marginBottom: '40px' }} />

      <div className="toc-container">
        <h2>MISSION LOGS</h2>
        <ul>
          {chapters.map((chap, idx) => (
            chap.title !== "Title Page" && (
              <li key={idx}>
                <a href={`#chapter-${idx}`}>{chap.title}</a>
              </li>
            )
          ))}
        </ul>
        <AdUnit slot="toc-ad" style={{ marginTop: '20px' }} />
      </div>

      <main className="novel-content">
        {chapters.map((chap, chapIdx) => {
          if (chap.title === "Title Page") return null;
          const currentImg = genImgs[imgIdx++];
          
          return (
            <div key={chapIdx}>
              <article id={`chapter-${chapIdx}`} className="chapter">
                  {currentImg && (
                      <img 
                          src={`/generated_visuals/${currentImg}`} 
                          alt="Chapter Visual" 
                          className="novel-image" 
                      />
                  )}
                  <h2 className="chapter-title">{chap.title}</h2>
                  {chap.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="novel-paragraph">{paragraph}</p>
                  ))}
              </article>
              {(chapIdx + 1) % 3 === 0 && (
                <AdUnit slot={`chapter-mid-${chapIdx}`} style={{ margin: '40px 0' }} />
              )}
            </div>
          );
        })}
      </main>
      <footer className="novel-footer">
        <AdUnit slot="footer-ad" style={{ marginBottom: '20px' }} />
        <p>© 2026 GRAVEWAVE OPERATIONS | POWERED BY NANA BANANA GENERIC VISION</p>
      </footer>
    </div>
  )
}

export default App
