import { css } from 'styled-components';

const styles = css`
  vertical-align: top;
  position: relative;
  opacity: 1;
  margin: -1px 0 8px -2px;
  width: 100%;

  .button-next {
    cursor: pointer;
    border: 0;
    background: transparent;
    top: 11px;
    right: 0px;
    display: block;
    width: 25px;
    position: absolute;
    transform: translateY(-50%);
    overflow: hidden;
    height: 34px;
    padding-right: 0;

    ::before {
      content: '';
      display: inline-block;
      border-left: 2px solid ${props => props.theme.colors.DARK};
      border-top: 2px solid ${props => props.theme.colors.DARK};
      height: 7px;
      width: 7px;
      position: relative;
      border-radius: 2px;
      transform: rotate(135deg);
      top: -1px;
      right: 0px;
    }
  }

  .button-prev {
    cursor: pointer;
    padding-left: 0;
    border: 0;
    background: transparent;
    top: 11px;
    left: 0px;
    display: block;
    width: 25px;
    position: absolute;
    transform: translateY(-50%);
    overflow: hidden;
    height: 34px;

    ::before {
      content: '';
      display: inline-block;
      border-left: 2px solid ${props => props.theme.colors.DARK};
      border-top: 2px solid ${props => props.theme.colors.DARK};
      height: 7px;
      width: 7px;
      position: relative;
      border-radius: 2px;
      transform: rotate(-45deg);
      top: -1px;
      left: 0px;
    }
  }

  .content-colors {
    padding: 0;
    margin: 8px 0px 12px;
  }
  .color-swatches-container {
    margin-left: 30px;
  }

  .content-colors-button {
    margin: 0 2px;
    font-size: 0;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: inline;
    vertical-align: top;
    overflow: hidden;
    background: transparent;
    padding: 0;

    &.active {
      border: 1px solid ${props => props.theme.colors.DARK};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .content-colors-button {
      width: 20px;
      height: 20px;
    }
  }
`;

export default styles;
