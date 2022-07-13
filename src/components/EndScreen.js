import '../component.styles/EndScreen.css';
import { useEffect, useState } from 'react';
import SubmitInfo from './SubmitInfo';
import { db } from '../firebase.config';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import LeaderboardUser from './LeaderboardUser';

export default function EndScreen({ time }) {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [leaderboardInformation, setLeaderboardInformation] = useState([]);

  const svg = document.querySelector('.homeSvg>path');
  svg.style.fill = 'rgb(47 255 135 / 70%)';

  useEffect(() => {
    const recentMessagesQuery = query(
      leaderboardRef,
      orderBy('time', 'asc'),
      limit(10),
    );
    onSnapshot(recentMessagesQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLeaderboardInformation(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentGame =
    window.location.href.split('/')[window.location.href.split('/').length - 1];

  const leaderboardRef = collection(db, `${currentGame}Leaderboard`);

  const leaderboard = (
    <div>
      <h2 className="leaderboardText">LEADERBOARD</h2>
      <div>
        {leaderboardInformation.map((info, index) => {
          return <LeaderboardUser key={info.id} info={info} index={index} />;
        })}
      </div>
    </div>
  );

  return (
    <div className="endScreen">
      <div className="endContainer">
        {/* Everything goes here */}
        {submitStatus ? (
          leaderboard
        ) : (
          <SubmitInfo
            time={time}
            setSubmitStatus={setSubmitStatus}
            currentGame={currentGame}
          />
        )}
      </div>
    </div>
  );
}

// window.location.href.split('/')[window.location.href.split('/').length - 1]
