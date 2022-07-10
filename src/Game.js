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
    return [event.nativeEvent.offsetX, event.nativeEvent.offsetY];
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

  function flash(condition) {
    const container = document.querySelector('.container');
    const gameImage = document.querySelector('.gameImage');
    const timer = document.querySelector('h1');

    if (condition === 'Pass') {
      container.classList.remove(`containerFail`);
      timer.classList.remove(`textFail`);
    } else {
      container.classList.remove(`containerPass`);
      timer.classList.remove(`textPass`);
    }
    container.classList.add(`container${condition}`);
    gameImage.classList.add('flash');
    timer.classList.add(`text${condition}`);
    if (container.classList.contains(`container${condition}`)) {
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

  function userClicked(event) {
    const coordinates = getCoordinates(event);

    // Control
    const baseHeight = 864;
    const baseWidth = 1536;
    // Should be pulled from firebase
    const x = 168;
    const y = 782;
    //

    // User Input
    const userHeight = event.target.height;
    const userWidth = event.target.width;
    const selectedCoordX = (baseHeight / userHeight) * coordinates[0];
    const selectedCoordY = (baseWidth / userWidth) * coordinates[1];
    //

    const tolerance = 24;

    if (
      selectedCoordX > x - tolerance &&
      selectedCoordX < x + tolerance &&
      selectedCoordY > y - tolerance &&
      selectedCoordY < y + tolerance
    ) {
      flash('Pass');
      endTimer();
    } else {
      flash('Fail');
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
            onClick={userClicked}
            onContextMenu={() => flash('Pass')}
            src={image}
            alt="find waldo"
          />
        )}
      </div>
    </div>
  );
}
