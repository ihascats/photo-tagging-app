import '../component.styles/Restart.css';
import Icon from '@mdi/react';
import { mdiRestart } from '@mdi/js';

export default function Restart({ reset }) {
  return (
    <div className="restart" onClick={reset}>
      <Icon
        className="homeSvg"
        path={mdiRestart}
        title="Restart"
        size={2}
        horizontal
        vertical
        rotate={180}
        color="rgb(122, 182, 33)"
      />
    </div>
  );
}
