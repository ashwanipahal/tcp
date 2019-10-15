import { css } from 'styled-components';

const applyBrandSpecificBorder = props => {
  return props.theme.isGymboree
    ? props.theme.colorPalette.orange[800]
    : props.theme.colors.TEXT.DARKERBLUE;
};

export default css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${props => applyBrandSpecificBorder(props)};
  background-color: ${props => props.theme.colorPalette.white};
  position: fixed;
  bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  z-index: 99;
  outline: none;
  cursor: pointer;
  transition-duration: 0.4s;

  .scrollToTop__arrowBtn {
    width: 15px;
    height: 15px;
    border: solid ${props => applyBrandSpecificBorder(props)};
    border-width: 3px 0 0 3px;
    transform: rotate(45deg);
    margin: 14px auto 0;
  }

  &.scrollToTopBtn--show {
    display: block;
  }

  &.scrollToTopBtn--hide {
    display: none;
  }

  &:hover {
    @media ${props => props.theme.mediaQuery.large} {
      background-color: ${props => applyBrandSpecificBorder(props)};

      .scrollToTop__arrowBtn {
        border-color: ${props => props.theme.colorPalette.white};
      }
    }
  }
`;
