import { Link } from 'react-router-dom';
import '../component.styles/GameSelect.css';

export default function GameSelect({ image, link }) {
  return (
    <div className="selectContainer">
      <Link draggable={false} to={process.env.PUBLIC_URL + `/${link}`}>
        <img draggable={false} src={image} alt="Wheres Waldo?" />
      </Link>
    </div>
  );
}
