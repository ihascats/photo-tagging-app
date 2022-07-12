import '../component.styles/LookingFor.css';

export default function LookingFor(characters) {
  console.log(characters);
  return (
    <div className="lookingFor">
      {characters['characters'].map((character) => {
        return (
          <img
            className={character.slice(84, 90).split('.')[0]}
            key={character.slice(84, 90).split('.')[0]}
            src={character}
            alt={character.slice(84, 90).split('.')[0]}
          />
        );
      })}
    </div>
  );
}
