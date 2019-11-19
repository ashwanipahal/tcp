import { css } from 'styled-components';

const styles = css`
  box-sizing: border-box;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  @media ${props => props.theme.mediaQuery.medium} {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .availability-btn {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    color: ${props => props.theme.colorPalette.gray[900]};
  }
  .placeRewardsPage-btn {
    pointer-events: none;
  }
  .disable-btn {
    opacity: 0.5;
    color: ${props => props.theme.colorPalette.gray[700]};
    pointer-events: none;
  }
  .availability-btn:hover {
    background: ${props => props.theme.colorPalette.white};
  }
  .availability-btn-active,
  .availability-btn-active:hover {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    color: ${props => props.theme.colorPalette.black};
    background-color: ${props => props.theme.colorPalette.white};
    min-height: 42px;
    padding: 0px;
  }
`;

export default styles;
