import '../component.styles/EndScreen.css';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { useState } from 'react';

export default function EndScreen({ time }) {
  const [submitStatus, setSubmitStatus] = useState(false);

  function submitTime() {
    const timer = time.split(':');
    const seconds = Number(timer[0]) * 60 + Number(timer[1]);
    const username = document.querySelector('.username').value;
    console.log(username, seconds);
    setSubmitStatus(true);
  }

  const submitInfo = (
    <div>
      <p>{time}</p>
      <input className="username" type="text"></input>
      <button onClick={submitTime}>
        <Icon
          path={mdiArrowRight}
          title="User Profile"
          size={2}
          horizontal
          vertical
          rotate={180}
          color="#f3ffee"
        />
      </button>
    </div>
  );

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
        {submitStatus ? leaderboard : submitInfo}
      </div>
    </div>
  );
}
