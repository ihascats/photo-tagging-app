import '../component.styles/SubmitButton.css';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

export default function SubmitButton({ executeFunction }) {
  return (
    <button onClick={executeFunction}>
      <Icon
        path={mdiArrowRight}
        title="User Profile"
        size={2}
        horizontal
        vertical
        rotate={180}
        color="#f3ffee"
      />
    </button>
  );
}
