import { css } from 'styled-components';

const iconSpacing = '15px';

const mprplcce = props =>
  props.plccUser ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const StyledModal = css`
  position: absolute;
  margin: auto;
  width: 374px;
  height: auto;
  right: ${props => (props.variation === 'primary' ? '0' : '')};
  left: ${props => (props.variation === 'secondary' ? '0' : '')};
  z-index: ${props => props.theme.zindex.zDrawer};
  ${props =>
    props.component !== 'accountDrawer'
      ? `@media ${props.theme.mediaQuery.smallOnly} {
    position: fixed;
    top: 0 !important;
    height: 100%;
    width: 100%;
  }`
      : `@media ${props.theme.mediaQuery.smallOnly} {
          height: 100%;
          width: 100%;
      }`}
  &:focus, &:active {
    outline: 0;
  }
  .dialog__content {
    background-color: ${props => props.theme.colorPalette.white};
    box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.25);
    width: 100%;
    overflow-y: auto;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      max-height: none !important;
      height: ${props => (props.component === 'accountDrawer' ? 'auto' : '100%')};
    }
    margin-top: 8px;
  }
  .condensed-overlay {
    top: 0;

    @media ${props => props.theme.mediaQuery.medium} {
      overflow-y: scroll;
      position: fixed;
      top: 61px;
      width: 374px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      top: 70px;
    }
  }
  .modal__bar {
    position: absolute;
    @media ${props => props.theme.mediaQuery.medium} {
      position: ${props => (props.showCondensedHeader ? 'fixed' : 'absolute')};
    }
    height: 8px;
    margin-top: -8px;
    width: 100%;
    z-index: 99;
  }
  .mpr-plcc-theme {
    background-color: ${props =>
      !props.isLoggedIn ? props.theme.colorPalette.userTheme.noMprPlcc : mprplcce};
  }

  .ca-no-theme {
    background-color: ${props => props.theme.colorPalette.userTheme.noMprPlcc};
  }

  .modal__triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    top: -10px;
    z-index: 99;
  }
  .triangle-theme {
    border-bottom: 10px solid
      ${props => (!props.isLoggedIn ? props.theme.colorPalette.userTheme.noMprPlcc : mprplcce)};
  }
  .triangle-ca-no-theme {
    border-bottom: 10px solid ${props => props.theme.colorPalette.userTheme.noMprPlcc};
  }
  .modal__triangle.condensed-modal-triangle {
    @media ${props => props.theme.mediaQuery.medium} {
      position: fixed;
      top: 52px;
      right: 74px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      top: 61px;
    }
  }
  .modal__closeIcon {
    background: transparent url('/static/images/modal-close.svg') no-repeat 0 0;
    border: none;
    cursor: pointer;
    position: absolute;
    right: ${iconSpacing};
    top: ${iconSpacing};
    height: ${iconSpacing};
    width: ${iconSpacing};
    z-index: 1;
  }

  .Modal_Heading_Overlay {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    font-size: ${props => props.theme.typography.fontSizes.fs18};
    font-family: ${props => props.theme.typography.fonts.secondary};
  }
`;

export default StyledModal;
