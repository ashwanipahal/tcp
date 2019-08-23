import { css } from 'styled-components';

export default css`
  &.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
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

    @media ${props => props.theme.mediaQuery.medium} {
      width: 80%;
    }
  }
`;
