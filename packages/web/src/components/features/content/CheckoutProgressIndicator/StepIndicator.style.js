import { css } from 'styled-components';

import { getIconPath } from '../../../../../../core/src/utils';

const checkouttick = getIconPath('checkout-tick');

export default css`
  .checkout-progress-indicator {
    padding: 0px;
    overflow: hidden;
  }

  .checkout-progress-bar {
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    position: relative;
    padding: 6px 0 18px;

    @media ${props => props.theme.mediaQuery.large} {
      display: block;
      margin: 0px auto;
      width: 500px;
      padding: 18px 0 20px;
      left: auto;
      position: relative;
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      width: 374px;
    }

    &.pickup-shipping {
      @media ${props => props.theme.mediaQuery.large} {
        padding: 18px 0 14px;
        width: 528px;
      }

      li {
        width: 25%;
      }
    }
  }

  .stepIndicatorList {
    list-style-type: none;
    width: 33.3%;
    float: left;
    font-size: ${props => props.theme.spacing.ELEM_SPACING.SM};
    position: relative;
    text-align: center;
    color: ${props => props.theme.colors.TEXT.DARK};

    &:before {
      width: 24px;
      height: 24px;
      content: '';
      display: block;
      text-align: center;
      margin: 0 auto 7px;
      border-radius: 50%;
      @media ${props => props.theme.mediaQuery.large} {
        margin: 0 auto 10px;
      }
    }

    &:after {
      height: 2px;
      content: '';
      position: absolute;
      background-color: ${props => props.theme.colors.TEXT.DARKERGRAY};
      top: 10px;
      right: calc(50% + 12px);
      left: calc(-50% + 12px);
      z-index: 1;
    }

    &:first-child:after {
      content: none;
    }

    button,
    span {
      text-transform: none;
      font-size: ${props => props.theme.typography.fontSizes.fs18};
      @media ${props => props.theme.mediaQuery.smallOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs14};
      }
    }

    button {
      color: ${props => props.theme.colors.TEXT.DARK};
      border: none;
      cursor: pointer;
      background-color: transparent;
    }
  }

  .completed {
    display: block;

    &.stageName {
      color: ${props => props.theme.colors.TEXT.DARKGRAY};
    }

    &:before {
      content: '';
      background: url(${checkouttick});
      background-color: ${props => props.theme.colors.WHITE};
      height: 26px;
      width: 26px;
      position: inherit;
      display: block;
      z-index: 1;
    }

    .white-background {
      width: 20px;
      height: 10px;
      position: absolute;
      background: ${props => props.theme.colors.WHITE};
      top: 0px;
      right: 44%;
    }
  }

  .active {
    &.stageName {
      color: ${props => props.theme.colors.TEXT.DARK};
    }

    &:before {
      padding: 1px;
      content: '';
      background-color: ${props => props.theme.colors.WHITE};
    }

    .white-dot {
      background-color: ${props => props.theme.colors.WHITE};
      border: 2px solid ${props => props.theme.colors.BLACK};
      border-radius: 50%;
      display: block;
      height: 22px;
      width: 22px;
      position: absolute;
      left: ${props => (props.availableStages.length > 3 ? '35%' : '40%')};
      top: -1px;
      @media ${props => props.theme.mediaQuery.large} {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .pending {
    &:before {
      background-color: ${props => props.theme.colors.WHITE};
      border: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
    }
  }

  .checkout-progress-indicator-title {
    text-transform: uppercase;
    text-align: center;
  }
`;
