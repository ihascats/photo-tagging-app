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
        title="Home"
        size={2}
        horizontal
        vertical
        rotate={180}
        color="rgb(122, 182, 33)"
      />
    </Link>
  );
}
