import React, { useCallback, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../AppProvider';
import { TypeNames } from '../../services/interfaces';
import { ReactComponent as PokeLupa } from '../../assets/pokelupa.svg';
import SearchContainer from './style';

const SearchBar: React.FC<TypeNames> = ({ typeName }) => {
  const location = useLocation();
  const history = useHistory();
  const { searchTerms, setSearchTerms } = useContext(AppContext);

  const handleSubmit = useCallback(() => {
    if (location.pathname !== `/${typeName}`) {
      history.push(`/${typeName}`);
    }
  }, [history, location.pathname, typeName]);

  const handleSearchChange = useCallback(
    (newTerms: string) => {
      setSearchTerms(newTerms.slice(0, 100));
    },
    [setSearchTerms],
  );

  return (
    <SearchContainer
      action=""
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type=""
        maxLength={100}
        name="search"
        placeholder="Qual pokémon você procura?"
        value={searchTerms}
        onChange={e => handleSearchChange(e.target.value)}
      />
      <button type="submit">
        <PokeLupa />
      </button>
    </SearchContainer>
  );
};

export default SearchBar;
