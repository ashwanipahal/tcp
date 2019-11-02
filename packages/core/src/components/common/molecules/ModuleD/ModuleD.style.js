import { css } from 'styled-components';

export default css`
  .moduleD_button {
    margin: 0 auto 32px;
    padding: 12px 0;
    width: 225px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 auto 48px;
      padding: 16px 0;
      width: 210px;
    }
  }
  .moduleD_tile {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .moduleD_link {
    text-align: center;
    color: ${props => props.theme.colorPalette.text.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }

  .moduleD_textlink::after {
    font-size: 23px;
    position: relative;
    top: 3px;
    margin-left: 8px;
  }
`;
