import styled from 'styled-components';
import { LinkText } from '..';
import Button from '../../atoms/Button';

const StyledLinkText = styled(LinkText)`
  .link-text {
    color: ${props =>
      props.theme.isGymboree ? props.theme.colors.TEXT.DARK : props.theme.colors.WHITE};
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    &.padding-LR-15 {
      padding: 0 15px;
    }
  }
  &.header-text {
    .small_text_white_medium {
      display: block;
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: inline;
      }
    }
  }
`;
/**
 * ColWrapper : This will be used for TCP, Gym Variation 1 and GYM Variation 2 Padding.
 */
const ColWrapper = styled.div`
  position: relative;
  padding: 32px 0;
  @media ${props => props.theme.mediaQuery.large} {
    padding: 48px 15px;
  }
`;
/**
 * ImgContainer : This will be used for TCP and Gym Variation 1.
 */
const ImgContainer = styled.div`
  text-align: center;
  img {
    max-height: 100%;
  }
  height: ${props => (props.theme.isGymboree ? '420px' : '356px')};
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    height: ${props => (props.theme.isGymboree ? '480px' : '356px')};
  }
  @media ${props => props.theme.mediaQuery.large} {
    height: ${props => (props.theme.isGymboree ? '616px' : '580px')};
  }
`;

/**
 * RibbonViewImgContainer : This will be used for TCP and Gym Variation 1.
 */
const RibbonViewImgContainer = styled.div`
  text-align: center;
  margin-bottom: 8px;
  height: 273px;
  img {
    max-height: 100%;
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    height: 393px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    height: 355px;
  }
`;

/**
 * Container : This will be used to place content to the right or left for TCP and GYM Variation 1.
 */
const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translate(0%, -50%);
  width: 225px;
  text-align: center;
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    width: 335px;
    right: ${props => (props.theme.isGymboree ? '47px' : '25px')};
  }
  @media ${props => props.theme.mediaQuery.large} {
    width: ${props => (props.theme.isGymboree ? '272px' : '259px')};
    right: 51px;
  }
`;
const StyledButton = styled(Button)`
  ${props => (props.theme.isGymboree ? 'background: transparent;' : '')};
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    width: 221px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    width: 258px;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;
const StyledRibbonButton = styled(Button)`
  width: 225px;
  @media ${props => props.theme.mediaQuery.large} {
    width: 210px;
  }
`;

export {
  StyledLinkText as LinkText,
  ColWrapper,
  ImgContainer,
  RibbonViewImgContainer,
  Container,
  ButtonContainer,
  StyledButton as Button,
  StyledRibbonButton as RibbonButton,
};

export default {
  LinkText: StyledLinkText,
  ColWrapper,
  ImgContainer,
  RibbonViewImgContainer,
  Container,
  ButtonContainer,
  Button: StyledButton,
  RibbonButton: StyledRibbonButton,
};
