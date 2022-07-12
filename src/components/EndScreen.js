import '../component.styles/EndScreen.css';
import { useState } from 'react';
import SubmitInfo from './SubmitInfo';

export default function EndScreen({ time }) {
  const [submitStatus, setSubmitStatus] = useState(false);

  function getTime(time) {
    let minutes = Math.floor(time / 60).toString();
    let seconds = (time % 60).toString();
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }
    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  const leaderboard = <div></div>;

  return (
    <div className="endScreen">
      <div className="endContainer">
        {/* Everything goes here */}
        {submitStatus ? (
          leaderboard
        ) : (
          <SubmitInfo time={time} setSubmitStatus={setSubmitStatus} />
        )}
      </div>
    </div>
  );
}
