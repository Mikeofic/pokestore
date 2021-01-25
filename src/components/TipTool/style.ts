import styled from 'styled-components';

const alignment = {
  right: `right: 0;`,
  left: `left: 0;`,
  center: `left: 50%;
  transform: translateX(-50%);`,
};

export interface TipToolProps {
  align?: 'right' | 'left' | 'center';
}

const TipToolContainer = styled.div<TipToolProps>`
  position: absolute;
  z-index: 10;
  display: flex;
  top: calc(100% + 5px);
  ${props => alignment[props.align || 'center']}
  ${props =>
    props.className?.includes('remove')
      ? `
    max-width: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
  `
      : ''};

  > div {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 7px 10px;
    border-radius: 6px;
    box-shadow: 0 5px 10px -7px rgba(0, 0, 0, 1);
    text-align: center;
    transition: opacity 0.25s;

    &.show {
      opacity: 1;
    }

    &.hide {
      opacity: 0;
    }
  }
`;

export default TipToolContainer;
