import React, { useCallback, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TypeNames } from '../../services/interfaces';
import { ReactComponent as PokeLupa } from '../../assets/pokelupa.svg';
import SearchContainer from './style';
import { AppContext } from '../../AppProvider';

const SearchBar: React.FC<TypeNames> = ({ typeName }) => {
  const { searchBarTerms, setSearchBarTerms } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(() => {
    const query = new URLSearchParams(location.search).get('ps');
    const browserQuery = query ? query.trim().toLowerCase() : '';
    if (
      (location.pathname !== `/${typeName}` &&
        location.pathname !== `/${typeName}/`) ||
      browserQuery !== searchBarTerms.trim().toLowerCase()
    ) {
      if (searchBarTerms.trim()) {
        history.push(`/${typeName}/?ps=${searchBarTerms.trim()}`);
      } else {
        history.push(`/${typeName}`);
      }
    }
  }, [history, typeName, searchBarTerms, location.pathname, location.search]);

  const handleSearchChange = useCallback(
    (terms: string) => {
      setSearchBarTerms(terms.slice(0, 100));
    },
    [setSearchBarTerms],
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
        name="ps"
        placeholder="Qual pokémon você procura?"
        value={searchBarTerms}
        onChange={e => handleSearchChange(e.target.value)}
      />
      <button type="submit">
        <PokeLupa />
      </button>
    </SearchContainer>
  );
};

export default SearchBar;
