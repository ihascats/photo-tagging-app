import '../component.styles/HomeLink.css';
import Icon from '@mdi/react';

import { mdiHome } from '@mdi/js';
import { Link } from 'react-router-dom';

export default function HomeLink() {
  return (
    <Link className="home" draggable={false} to={process.env.PUBLIC_URL + `/`}>
      <Icon
        className="homeSvg"
        path={mdiHome}
        title="User Profile"
        size={2}
        horizontal
        vertical
        rotate={180}
        color="black"
      />
    </Link>
  );
}