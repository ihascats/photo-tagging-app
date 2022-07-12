import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { sendTime } from '../firebase.config';

export default function SubmitInfo({ time, setSubmitStatus, currentGame }) {
  function submitTime() {
    const timer = time.split(':');
    const seconds = Number(timer[0]) * 60 + Number(timer[1]);
    const username = document.querySelector('.username').value;
    // send username and seconds to firebase
    sendTime({ username, time: seconds }, currentGame);
    setSubmitStatus(true);
  }

  return (
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
}
