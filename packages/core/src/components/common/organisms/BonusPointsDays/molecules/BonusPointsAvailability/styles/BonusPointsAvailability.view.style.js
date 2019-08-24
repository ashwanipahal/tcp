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
    color: ${props => props.theme.colorPalette.gray[900]};
  }
  .disable-btn {
    opacity: 0.5;
    color: ${props => props.theme.colorPalette.gray[700]};
  }
  .availability-btn:hover {
    background: ${props => props.theme.colorPalette.white};
  }
  .availability-btn-active,
  .availability-btn-active:hover {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    color: ${props => props.theme.colorPalette.white};
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    min-height: 42px;
    padding: 0px;
  }
`;

export default styles;
