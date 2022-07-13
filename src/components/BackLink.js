import '../component.styles/BackLink.css';
import Icon from '@mdi/react';

import { mdiArrowLeftThick } from '@mdi/js';
import { Link } from 'react-router-dom';

export default function BackLink() {
  return (
    <Link className="back" draggable={false} to={process.env.PUBLIC_URL + `/`}>
      <Icon
        className="backSvg"
        path={mdiArrowLeftThick}
        title="Back"
        size={2}
        horizontal
        vertical
        rotate={180}
        color="black"
      />
    </Link>
  );
}
