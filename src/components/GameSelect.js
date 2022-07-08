import '../component.styles/GameSelect.css';

export default function GameSelect({ image }) {
  return (
    <div className="selectContainer">
      <img src={image} alt="Wheres Waldo?" />
    </div>
  );
}
