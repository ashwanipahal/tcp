import { css } from 'styled-components';

export default css`
  &.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: ${props => props.theme.zindex.zPLPFilterDropDown};
  }

  &.display-block {
    display: block;
  }

  &.display-none {
    display: none;
  }

  .modal-spacing {
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    margin-top: 22px;

    button {
      max-width: 164px;
      height: 42px;
    }

    .close-button {
      text-align: right;
    }
  }

  .modal-main {
    position: fixed;
    background: white;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 27px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 80%;
      max-width: 600px;
    }

    .filter-row {
      margin-bottom: 7px;
      margin-top: 14px;
    }

    .accordion {
      &.active:after,
      &.inactive:after {
        right: 42px;
      }
    }
  }

  .open-filter-button {
    background: url('/static/images/carrot-small-up.png') no-repeat;
    background-position: 95% 18px;
    background-color: ${props => props.theme.colors.ACCORDION.INACTIVE_HEADER};
    font-size: ${props => props.theme.fonts.fontSize.body.large.secondary}px;

    &.open-filter-button-expanded {
      background: url('/static/images/carrot-small-down.png') no-repeat;
      background-position: 95% 18px;

      &:hover:not([disabled]) {
        background: url('/static/images/carrot-small-down.png') no-repeat;
        background-position: 95% 18px;
        background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      }
    }

    &:hover:not([disabled]) {
      background: url(/static/images/carrot-small-up.png) no-repeat;
      background-position: 95% 18px;
      background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    }
  }
`;
