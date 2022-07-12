import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import './App.css';
import GameSelect from './components/GameSelect';
import GithubLink from './components/GithubLink';
import { storage } from './firebase.config';

function App() {
  const [imageList, setImageList] = useState([]);
  const imagesRef = ref(storage, '/');

  useEffect(() => {
    setImageList([]);
    listAll(imagesRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="wrapper">
        {imageList.map((url) => {
          return (
            <GameSelect
              key={url.slice(71, 83)}
              image={url}
              link={url.slice(71, 83)}
            />
          );
        })}
      </div>
      <GithubLink />
    </div>
  );
}

export default App;
