import styled, { css } from 'styled-components';
import { LinkText } from '..';

const StyledLinkText = styled(LinkText)`
  .link-text {
    span {
      display: block;
    }
  }
`;
const ColWrapper = styled.div`
  position: relative;
  padding: 32px 0;
  @media ${props => props.theme.mediaQuery.large} {
    padding: 48px 15px;
  }
`;
const WORibbonImgContainer = styled.div`
  text-align: center;
  height: ${props => (props.theme.isGymboree ? '420px' : '356px')};
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    height: ${props => (props.theme.isGymboree ? '480px' : '356px')};
  }
  @media ${props => props.theme.mediaQuery.large} {
    height: ${props => (props.theme.isGymboree ? '616px' : '580px')};
  }
`;
const RibbonImgContainer = styled.div`
  text-align: center;
  margin-bottom: 8px;
  height: 273px;
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    height: 393px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    height: 355px;
  }
`;
const RLContainer = styled.div`
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
`;
const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;
const style = css`
  /* Gymboree Variation Design Starts Here*/
  .tb-btn {
    width: 225px;
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
    }
  }
  /* Gymboree Variation Design Ends Here*/
`;
export {
  StyledLinkText as LinkText,
  ColWrapper,
  WORibbonImgContainer,
  RibbonImgContainer,
  RLContainer,
  ButtonContainer,
  style,
};

export default {
  LinkText: StyledLinkText,
  ColWrapper,
  WORibbonImgContainer,
  RibbonImgContainer,
  RLContainer,
  ButtonContainer,
  style,
};
