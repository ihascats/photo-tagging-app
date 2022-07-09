import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  function getCoordinates(event) {
    console.log(event.pageX, event.pageY);
  }

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

  // run this when user finds all characters
  function endTimer() {
    clearInterval(secondsTimer);
    clearInterval(minutesTimer);
  }

  const startScreen = (
    <div className="startScreen">
      <button onClick={startTimer}>START</button>
    </div>
  );

  function flashRed() {
    document.querySelector('.container').classList.add('containerFail');
    document.querySelector('.gameImage').classList.add('flash');
    document.querySelector('h1').classList.add('textFail');
    setTimeout(() => {
      document.querySelector('.container').classList.remove('containerFail');
      document.querySelector('.gameImage').classList.remove('flash');
      document.querySelector('h1').classList.remove('textFail');
    }, 2000);
  }

  function flashGreen() {
    document.querySelector('.container').classList.add('containerPass');
    document.querySelector('.gameImage').classList.add('flash');
    document.querySelector('h1').classList.add('textPass');
    setTimeout(() => {
      document.querySelector('.container').classList.remove('containerPass');
      document.querySelector('.gameImage').classList.remove('flash');
      document.querySelector('h1').classList.remove('textPass');
    }, 2000);
  }

  return (
    <div className="gameWrap">
      <h1>
        {getTime(minutes)}:{getTime(seconds)}
      </h1>
      <div className="container">
        {!gameStarted ? (
          startScreen
        ) : (
          <img
            className="gameImage"
            onClick={flashRed}
            src={image}
            alt="find waldo"
          />
        )}
      </div>
    </div>
  );
}

// wheresWaldo0:
// Waldo X: Y:
// wheresWaldo1:
// Waldo X: Y:
// wheresWaldo2:
// Waldo X: Y:
