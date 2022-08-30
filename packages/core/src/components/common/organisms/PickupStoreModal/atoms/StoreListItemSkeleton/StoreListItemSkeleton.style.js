import { css, keyframes } from 'styled-components';

const progress = keyframes`0% {
  left: -500px;
}
100% {
  left: 500px;
}`;

const style = css`
  .store-tile {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    width: calc(100% - ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS});
    background-clip: content-box;
    border: 1px solid ${props => props.theme.colorPalette.gray[800]};
    padding: 16px 30px;
    height: 168px;
  }

  &.skeleton-row {
    position: relative;
  }
  .skeleton-col {
    background-color: rgb(239, 241, 246);
    overflow: hidden;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: -500px;
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0)
      );
      animation: ${progress} 0.5s ease-in-out infinite;
    }
  }
  .store-info {
    width: 30%;
  }
  .store-item-detail {
    width: 60%;
  }
`;
export default style;
