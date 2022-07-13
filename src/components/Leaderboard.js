import HomeLink from './HomeLink';
import LeaderboardUser from './LeaderboardUser';
import Restart from './Restart';

export default function Leaderboard({ leaderboardInformation, reset }) {
  return (
    <div>
      <h2 className="leaderboardText">LEADERBOARD</h2>
      <div>
        {leaderboardInformation.map((info, index) => {
          return <LeaderboardUser key={info.id} info={info} index={index} />;
        })}
      </div>
      <div>
        <Restart reset={reset} />
        <HomeLink />
      </div>
    </div>
  );
}
