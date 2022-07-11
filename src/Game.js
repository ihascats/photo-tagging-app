import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameImage from './components/GameImage';
import { storage } from './firebase.config';
import './Game.css';

export default function Game() {
  const [image, setImage] = useState();
  const imagesRef = ref(storage, '/');
  const { id } = useParams();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutesTimer, setMinutesTimer] = useState();
  const [secondsTimer, setSecondsTimer] = useState();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    listAll(imagesRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (url.slice(71, 83) === id) {
            setImage(url);
          }
        });
      });
    });
  }, []);

  function getTime(time) {
    if (time.toString().length === 1) {
      return `0${time}`;
    }
    return time;
  }

  function startTimer() {
    setGameStarted(true);
    const countSeconds = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    const countMinutes = setInterval(() => {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }, 60000);
    setSecondsTimer(countSeconds);
    setMinutesTimer(countMinutes);
  }

  const startScreen = (
    <div className="startScreen">
      <button onClick={startTimer}>START</button>
    </div>
  );

  function zoom(event) {
    if (!gameStarted) return;
    const image = document.querySelector('.gameImage');
    const zoomStrength = 200;

    if (event.key === '+') {
      if (image.width >= 5136) return;
      image.style.width = `${image.width + zoomStrength}px`;
    }
    if (event.key === '-') {
      if (image.width <= 1536) {
        return;
      }
      image.style.width = `${image.width - zoomStrength}px`;
    }
  }

  window.onkeydown = zoom;

  return (
    <div className="gameWrap">
      <h1>
        {getTime(minutes)}:{getTime(seconds)}
      </h1>
      <div className="container">
        {!gameStarted ? (
          startScreen
        ) : (
          <GameImage
            image={image}
            secondsTimer={secondsTimer}
            minutesTimer={minutesTimer}
          />
        )}
      </div>
    </div>
  );
}
