import { sendTime } from '../firebase.config';
import SubmitButton from './SubmitButton';

export default function SubmitInfo({ time, setSubmitStatus, currentGame }) {
  function submitTime() {
    const usernameInput = document.querySelector('.username');
    const username = usernameInput.value;
    if (username.length < 3) {
      usernameInput.style.borderColor = 'red';
      return;
    }
    const timer = time.split(':');
    const seconds = Number(timer[0]) * 60 + Number(timer[1]);
    // send username and seconds to firebase
    sendTime({ username, time: seconds }, currentGame);
    setSubmitStatus(true);
  }

  return (
    <div className="runInfo">
      <p>{time}</p>
      <input className="username" type="text"></input>
      <SubmitButton executeFunction={submitTime} />
    </div>
  );
}
