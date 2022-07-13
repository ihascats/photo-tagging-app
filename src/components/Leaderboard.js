import LeaderboardUser from './LeaderboardUser';

export default function Leaderboard({ leaderboardInformation }) {
  return (
    <div>
      <h2 className="leaderboardText">LEADERBOARD</h2>
      <div>
        {leaderboardInformation.map((info, index) => {
          return <LeaderboardUser key={info.id} info={info} index={index} />;
        })}
      </div>
    </div>
  );
}
