import { css } from 'styled-components';

const styles = css`
  .spinner-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.MODAL_OVERLAY};
    z-index: 1400;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
