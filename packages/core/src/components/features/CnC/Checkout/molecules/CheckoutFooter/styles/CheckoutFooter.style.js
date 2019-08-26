import { css } from 'styled-components';

const styles = css`
  border-top: 1px solid ${props => props.theme.colors.BLACK};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .back-link {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
  .back-link-image {
    position: absolute;
    top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.MED};
    left: 0;
    width: 9px;
    height: 18px;
  }
  .footer-button {
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    color: ${props => props.theme.colors.WHITE};
    width: 210px;
    height: 51px;
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.fontWeights};
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
  }
`;

export default styles;
