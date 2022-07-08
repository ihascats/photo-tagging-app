import './App.css';
import GameSelect from './components/GameSelect';
import waldo0 from './images/wheresWaldo0.jpg';
import waldo1 from './images/wheresWaldo1.jpg';
import waldo2 from './images/wheresWaldo2.jpg';

function App() {
  return (
    <div>
      <div className="wrapper">
        <GameSelect image={waldo0} link="something" />
        <GameSelect image={waldo1} />
        <GameSelect image={waldo2} />
        <GameSelect image={waldo0} />
        <GameSelect image={waldo1} />
      </div>
    </div>
  );
}

export default App;
