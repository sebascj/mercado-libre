import SearchBar from '../search-bar/search-bar';
import { List } from '../../models/models';

import './header.scss';

type Params = {
  onSearch: (list: List) => void;
};

const Header = ({ onSearch }: Params) => {
  return (
    <header className="header">
      <img
        className="header__logo"
        src="../../assets/Logo_ML@2x.png"
        alt="Logo"
      />
      <SearchBar className="header__bar" onSearch={onSearch} />
    </header>
  );
};

export default Header;
