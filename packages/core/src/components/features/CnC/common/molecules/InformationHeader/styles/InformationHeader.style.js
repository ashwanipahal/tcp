import { css } from 'styled-components';

export const customStyles = css`
  display: flex;
  flex: 1;
  padding-top: 11px;
  padding-bottom: 6px;
  border-top: solid 1px rgba(163, 162, 162, 0.5);
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  img {
    height: 13px;
    width: 13px;
    padding: 4px 7px 0 10px;
  }
  span {
    font-weight: bold;
    font-size: 14px;
  }
  .removeErrorMessage {
    text-decoration: underline;
    cursor: pointer;
    padding-bottom: 6px;
  }
`;

export const bagTileCSS = css`
  display: flex;
  flex: 1;
  padding-top: 11px;
  padding-bottom: 6px;
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  img {
    height: 18px;
    width: 18px;
    padding: 4px 7px 0 10px;
  }
  span {
    font-weight: bold;
    font-size: 16px;
  }
  .removeErrorMessage {
    text-decoration: underline;
    cursor: pointer;
    padding-bottom: 6px;
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    img {
      height: 13px;
      width: 13px;
      padding-left: 0px;
      padding-right: 8px;
    }
    span {
      font-size: 14px;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    img {
      padding-left: 0px;
      padding-right: 14px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    img {
      padding-right: 18px;
    }
  }
`;

export default css`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
`;
