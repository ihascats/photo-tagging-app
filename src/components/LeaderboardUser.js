import '../component.styles/LeaderboardUser.css';

export default function LeaderboardUser({ info, index }) {
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

  return (
    <div className="leaderboardInfo">
      <div className="placement">
        <h3>#{index + 1}</h3>
      </div>
      <div className="username">
        <p>NAME:</p>
        <h3>{info.username}</h3>
      </div>
      <div className="username">
        <p>TIME:</p>
        <h3>{getTime(info.time)}</h3>
      </div>
    </div>
  );
}
