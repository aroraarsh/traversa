import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

const Welcome = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [showFirstPrompt, setShowFirstPrompt] = useState(false);
  const [showSecondPrompt, setShowSecondPrompt] = useState(false);
  const [showThirdPrompt, setShowThirdPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
      setShowFirstPrompt(true);
    }, 3000);

    const secondPromptTimer = setTimeout(() => {
      setShowSecondPrompt(true);
    }, 5000);

    const thirdPromptTimer = setTimeout(() => {
      setShowThirdPrompt(true);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondPromptTimer);
      clearTimeout(thirdPromptTimer);
    };
  }, []);

  const firstPromptClasses = classNames('animate-fadeIn', {
    'hidden': !showFirstPrompt,
  });

  const secondPromptClasses = classNames('animate-fadeIn', {
    'hidden': !showSecondPrompt,
  });

  const thirdPromptClasses = classNames('animate-fadeIn', {
    'hidden': !showThirdPrompt,
  });

  return (
    <div className="flex items-center justify-center h-screen bg-blue-800">
      <div>
        {showTitle && (
          <h1 className="text-6xl text-amber-100 font-bold uppercase">
            Traversa
          </h1>
        )}
        {showFirstPrompt && (
          <div className={firstPromptClasses}>
            <p className="text-lg font-bold text-amber-100 mt-4">
            Welcome, you little explorer, to our AI-Powered Travel Itinerary Maker!</p>
          </div>
        )}
        {showSecondPrompt && (
          <div className={secondPromptClasses}>
            <p className="text-lg font-bold text-amber-100 mt-4">
            Ignite your wanderlust with our smart travel planner. Personalized itineraries, expert suggestions, and effortless planning await you.</p>
          </div>
        )}
        {showThirdPrompt && (
          <div className={thirdPromptClasses}>
            <p className="text-lg font-bold text-amber-100 mt-4">
            Let's embark on unforgettable journeys together!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
