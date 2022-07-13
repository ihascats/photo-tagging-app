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
import Leaderboard from './Leaderboard';

export default function EndScreen({ time, reset }) {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [leaderboardInformation, setLeaderboardInformation] = useState([]);

  const svg = document.querySelector('.backSvg>path');
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

  return (
    <div className="endScreen">
      <div className="endContainer">
        {/* Everything goes here */}
        {submitStatus ? (
          <Leaderboard
            leaderboardInformation={leaderboardInformation}
            reset={reset}
          />
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
