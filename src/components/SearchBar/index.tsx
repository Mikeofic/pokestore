import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { TypeNames } from '../../services/interfaces';
import { ReactComponent as PokeLupa } from '../../assets/pokelupa.svg';
import SearchContainer from './style';
import { useAppContext } from '../../AppProvider';

const SearchBar: React.FC<TypeNames> = ({ typeName }) => {
  const { searchBarTerms, setSearchBarTerms } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [hasloaded, setHasloaded] = useState(false);
  const [input_id] = useState(uuid());

  useEffect(() => {
    if (hasloaded) {
      setSearchBarTerms('');
    }
    setHasloaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeName]);

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
        id={`search_bar_${input_id}`}
        maxLength={100}
        name="ps"
        placeholder="Qual pokémon você procura?"
        value={searchBarTerms}
        onChange={e => handleSearchChange(e.target.value)}
      />
      <label htmlFor={`search_bar_${input_id}`}>Quantidade</label>
      <button aria-label="Search" type="submit">
        <PokeLupa />
      </button>
    </SearchContainer>
  );
};

export default SearchBar;
