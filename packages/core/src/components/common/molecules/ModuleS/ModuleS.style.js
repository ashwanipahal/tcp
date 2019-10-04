import styled, { css } from 'styled-components';
import { LinkText } from '..';

const StyledLinkText = styled(LinkText)`
  .link-text {
    span {
      display: block;
    }
  }
`;
const style = css`
  .innerPadding {
    padding: 32px 0;
    @media ${props => props.theme.mediaQuery.large} {
      padding: 48px 15px;
    }
  }
  .col-wrapper {
    position: relative;
  }
  .link-test-wrapper {
    span {
      display: block;
      width: 100%;
    }
  }
  .img-container {
    text-align: center;
    height: ${props => (props.theme.isGymboree ? '420px' : '356px')};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      height: ${props => (props.theme.isGymboree ? '480px' : '356px')};
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: ${props => (props.theme.isGymboree ? '616px' : '580px')};
    }
  }
  .rl-variation {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translate(0%, -50%);
    width: 225px;
    text-align: center;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 335px;
      right: ${props => (props.theme.isGymboree ? '47px' : '25px')};
      .rl-button {
        width: 221px;
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: ${props => (props.theme.isGymboree ? '268px' : '259px')};
      right: 51px;
      .rl-button {
        width: 258px;
      }
    }
  }
  /* Gymboree Variation Design Starts Here*/
  .tb-variation {
    .img-container {
      text-align: center;
      margin-bottom: 8px;
      height: 273px;
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        height: 393px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        height: 355px;
      }
    }
  }
  .tb-variation-btn-section {
    width: 100%;
    text-align: center;
  }
  .tb-variation-btn {
    width: 225px;
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
    }
  }
  /* Gymboree Variation Design Ends Here*/

  /* Ribbon Design starts Here */
  .ribbon-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .ribbon-container {
    background: transparent url(/static/images/module-a-ribbon-right.png) no-repeat 0 0;
    background-size: contain;
    right: 0;
    width: 240px;
    height: 71px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-bottom: 12px;
  }
  &.left-aligned-ribbon {
    .ribbon-wrapper {
      display: flex;
      justify-content: flex-start;
    }
    .ribbon-container {
      background: transparent url('/static/images/module-a-ribbon-left.png') no-repeat 0 0;
      background-size: contain;
    }
  }
  /* Ribbon Design Ends Here  */
`;
export { StyledLinkText as LinkText, style };

export default {
  LinkText: StyledLinkText,
  style,
};
