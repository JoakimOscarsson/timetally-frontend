import React, { useState, useEffect } from 'react';
import MainContent from './MainContent';
import './App.css';

const App = () => {
  const [showFirstRow, setShowFirstRow] = useState(false);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.load('1em Quicksand').then(() => {
      setFontLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;

    const firstTimer = setTimeout(() => setShowFirstRow(true), 200);
    const secondTimer = setTimeout(() => setShowSecondRow(true), 1200);
    const fadeOutTimer = setTimeout(() => setFadeOutIntro(true), 2200);
    const mainContentTimer = setTimeout(() => setShowMainContent(true), 2400);
    
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(mainContentTimer);
    };
  }, [fontLoaded]);

  return (
    <div className="container">
      <div className={`intro-content ${fadeOutIntro ? 'animate-fade-out' : ''}`}>
        <div className="text-container">
          <div className="text-row first-row">
            {showFirstRow && (
              <h1 
                className="animate-fade-in"
                style={{ 
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '2rem',
                  lineHeight: '1.2',
                  letterSpacing: '0.15em',
                  margin: 0
                }}
              >
                JOAKIM
              </h1>
            )}
          </div>
          <div className="text-row second-row">
            {showSecondRow && (
              <p
                className="animate-flip-in"
                style={{ 
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '1rem',
                  lineHeight: '1.2',
                  letterSpacing: '0.1em',
                  margin: 0
                }}
              >
                GAUFFIN-OSCARSSON
              </p>
            )}
          </div>
        </div>
      </div>
      {showMainContent && <MainContent />}
    </div>
  );
};

export default App;
