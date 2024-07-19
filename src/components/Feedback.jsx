import React, { useState } from 'react';
import css from './Feedback.module.css';
import Title from './Title';
import FeedbackButtons from './FeedbackButtons';
import NoFeedback from './NoFeedback';
import FeedbackResults from './FeedbackResults';

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [hasFeedback, sethasFeedback] = useState(false);

  const handleFeedback = type => {
    if (type === 'good') {
      setGood(prevGood => prevGood + 1);
    } else if (type === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else if (type === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
    sethasFeedback(true);
  };

  const calculatePositivePercentage = () => {
    const totalFeedback = good + bad;
    return totalFeedback === 0 ? 0 : ((good / totalFeedback) * 100).toFixed(2);
  };

  return (
    <div className={css.feedbackContainer}>
      <div className={css.leaveFeedback}>
        <Title title={'Please leave feedback'} />
        <FeedbackButtons
          first="Good"
          second="Neutral"
          last="Bad"
          onGood={() => handleFeedback('good')}
          onNeutral={() => handleFeedback('neutral')}
          onBad={() => handleFeedback('bad')}
        />
      </div>
      {hasFeedback ? (
        <FeedbackResults
          statusGood={good}
          statusNeutral={neutral}
          statusBad={bad}
          total={bad + neutral + good}
          positiveFeedback={calculatePositivePercentage()}
        />
      ) : (
        <NoFeedback nofeedbacktext={'There is no feedback'} />
      )}
    </div>
  );
};

export default Feedback;
