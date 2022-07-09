import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import './App.css';
import GameSelect from './components/GameSelect';
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
    </div>
  );
}

export default App;
