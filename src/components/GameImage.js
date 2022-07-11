import '../component.styles/GameImage.css';

export default function GameImage({ image, secondsTimer, minutesTimer }) {
  // run this when user finds all characters
  function endTimer() {
    clearInterval(secondsTimer);
    clearInterval(minutesTimer);
  }

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

  function getCoordinates(event) {
    return [event.nativeEvent.offsetX, event.nativeEvent.offsetY];
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
    <img
      className="gameImage"
      onClick={userClicked}
      onContextMenu={() => flash('Pass')}
      src={image}
      alt="find waldo"
    />
  );
}
