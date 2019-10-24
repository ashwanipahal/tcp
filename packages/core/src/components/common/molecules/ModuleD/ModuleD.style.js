import { css } from 'styled-components';

export default css`
  .moduleD_button {
    margin: 0 auto 32px;
    width: 225px;
    padding: 11px 0;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 auto 48px;
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
`;
