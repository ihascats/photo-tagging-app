import '../component.styles/GithubLink.css';
import Icon from '@mdi/react';

import { mdiGithub } from '@mdi/js';

export default function GithubLink() {
  return (
    <a
      className="github"
      href="https://github.com/ihascats"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        path={mdiGithub}
        title="User Profile"
        size={2}
        horizontal
        vertical
        rotate={180}
        color="black"
      />
    </a>
  );
}
