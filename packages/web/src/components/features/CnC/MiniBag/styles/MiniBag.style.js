import { css } from 'styled-components';

export const modalStyles = css`
  div.TCPModal__InnerContent {
    right: 0;
    left: auto;
    top: 0;
    bottom: 0;
    transform: none;
    box-shadow: 0 4px 8px 0 rgba(163, 162, 162, 0.5);
    width: 480px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
  }
  .Modal_Heading {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-weight: normal;
    border: none;
    margin-top: 20px;
    margin-bottom: 0;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    height: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    padding: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
`;
const styles = css`
  .mini-bg-close {
    top: 21px;
  }
  .addedToBagWrapper {
    overflow-y: auto;
    height: calc(100% - 43px);
  }
  .edit-button {
    min-height: unset;
  }
`;

export default styles;
