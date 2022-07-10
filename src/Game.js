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
    const container = document.querySelector('.container');
    const gameImage = document.querySelector('.gameImage');
    const timer = document.querySelector('h1');

    //
    container.classList.remove('containerPass');
    timer.classList.remove('textPass');
    container.classList.add('containerFail');
    gameImage.classList.add('flash');
    timer.classList.add('textFail');
    if (container.classList.contains('containerFail')) {
      //
      gameImage.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      gameImage.offsetHeight;
      gameImage.style.animation = '';

      //
      timer.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      timer.offsetHeight;
      timer.style.animation = '';
    }
  }

  function flashGreen() {
    const container = document.querySelector('.container');
    const gameImage = document.querySelector('.gameImage');
    const timer = document.querySelector('h1');

    container.classList.remove('containerFail');
    timer.classList.remove('textFail');
    container.classList.add('containerPass');
    gameImage.classList.add('flash');
    timer.classList.add('textPass');
    if (container.classList.contains('containerPass')) {
      gameImage.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      gameImage.offsetHeight;
      gameImage.style.animation = '';
      timer.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      timer.offsetHeight;
      timer.style.animation = '';
    }
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
            onContextMenu={flashGreen}
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
