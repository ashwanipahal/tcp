import { css } from 'styled-components';

const styles = css`
  padding: 65px 0;
  .image-zoom {
    overflow-x: hidden;
    width: 100%;
  }

  img {
    width: 100%;
  }

  .active-zoom-in {
    &.image-zoom {
      margin: 0px -27px;
      width: calc(100% + 54px);
    }
    & > img {
      display: block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 150%;
      max-width: none;
    }
  }
`;

export default styles;
