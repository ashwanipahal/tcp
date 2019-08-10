import { css } from 'styled-components';

const styles = css`
  box-sizing: border-box;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  @media ${props => props.theme.mediaQuery.medium} {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .availability-btn {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    pointer-events: none;
  }
  .disable-btn {
    opacity: 0.5;
  }
  .availability-btn:hover {
    background: ${props => props.theme.colorPalette.white};
  }
`;

export default styles;
