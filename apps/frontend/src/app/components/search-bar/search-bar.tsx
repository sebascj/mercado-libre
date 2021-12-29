import './search-bar.scss';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        placeholder="Nunca dejes de buscar"
        type="text"
      ></input>
      <button className="search-bar__button">
        <img
          className="search-bar__image"
          src="../../assets/ic_Search@2x.png"
          alt="search"
        ></img>
      </button>
    </div>
  );
};
export default SearchBar;
