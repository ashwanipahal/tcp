import { css } from 'styled-components';

const styles = css`
  position: absolute;
  bottom: 20px;
  left: 14px;
  right: 14px;
  flex-direction: column-reverse;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  @media ${props => props.theme.mediaQuery.large} {
    position: static;
    bottom: none;
    left: none;
    right: none;
    width: auto;
    flex-direction: row;
    border-top: 1px solid ${props => props.theme.colors.BLACK};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .back-space {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .back-link {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    width: 100%;
    @media ${props => props.theme.mediaQuery.large} {
      width: auto;
    }
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
    height: 51px;
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.fontWeights};
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
    width: 100%;
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
    }
  }
`;

export default styles;
