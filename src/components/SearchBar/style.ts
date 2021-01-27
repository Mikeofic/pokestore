import styled from 'styled-components';

const SearchContainer = styled.form`
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  width: 600px;
  height: 48px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s;

  &:focus-within {
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15), 0 0 0 5px rgba(0, 0, 0, 0.2);
  }

  input {
    flex-grow: 1;
    padding-left: 10px;
    font-size: 1.6rem;
    font-weight: 300;

    ::placeholder {
      font-style: italic;
      text-align: center;
    }
  }

  button {
    width: 50px;
    border-radius: 3px;

    &:hover {
      background: var(--default-color-lightest);
    }
    &:focus-visible {
      background: var(--default-color-lightest);
    }
    &:active {
      background: var(--button-border-color-light);
    }

    svg {
      width: 32px;
      height: 32px;
      fill: #585858;
    }

    &:hover svg {
      fill: var(--header-color);
    }
    &:focus-visible svg {
      fill: var(--button-box-shadow-color);
    }
    &:active svg {
      fill: var(--button-box-shadow-color);
    }
  }
`;

export default SearchContainer;
