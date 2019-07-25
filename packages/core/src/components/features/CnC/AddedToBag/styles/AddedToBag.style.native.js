import styled, { css } from 'styled-components';

export const styles = css`
  div.TCPModal__InnerContent {
    right: 0;
    left: auto;
    top: 0;
    bottom: 0;
    transform: none;
    box-shadow: 0 4px 8px 0 rgba(163, 162, 162, 0.5);
    padding: 7px 20px 20px;
    width: 250px;
    @media ${props => props.theme.mediaQuery.large} {
      width: 275px;
    }
  }
  .Modal_Heading {
    font-size: 16px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-weight: normal;
    line-height: 43px;
    border: none;
    margin-bottom: 0;
    padding: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
  .added-to-bg-close {
    top: 21px;
  }
  .addedToBagWrapper {
    overflow-y: auto;
    height: calc(100% - 43px);
    border: 1px solid black;
  }
`;

export const PlaceHolderView = styled.View`
  height: 150px;
  border: 1px solid black;
  margin: 10px;
  text-align: center;
`;

export default { styles, PlaceHolderView };
