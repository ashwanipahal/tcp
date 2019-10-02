import { css } from 'styled-components';

export default css`
  display: flex;
  flex: 1;
  padding-top: 6px;
  padding-bottom: 13px;
  font-size: 10px;
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  img {
    height: 13px;
    width: 13px;
    padding: 3px 13px 0 0;
  }
  .removeItem {
    margin: -11px 0 0 32px;
  }
  .removeAnchor {
    margin: 0 2px;
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
  }
  .pointer {
    cursor: pointer;
    margin: -11px 0 1px 32px;
  }
  .bagTileItem {
    margin: -11px 0 0 32px;
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
      padding-left: 6px;
      span {
        font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
      }
    }
    @media ${props => props.theme.mediaQuery.mediumMax} {
      margin-left: 22px;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-left: 28px;
    }
  }
  .removeErrorMessage {
    text-decoration: underline;
  }
`;
