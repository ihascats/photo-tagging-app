import '../component.styles/EndScreen.css';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { useState } from 'react';

export default function EndScreen({ time }) {
  return (
    <div className="endScreen">
      <div className="endContainer">
        {/* Everything goes here */}
        <p>{time}</p>
        <input type="text"></input>
        <button>
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
      </div>
    </div>
  );
}
