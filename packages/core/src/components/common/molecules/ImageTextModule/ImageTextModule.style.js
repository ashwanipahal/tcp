import styled, { css } from 'styled-components';

const ImgWrapper = styled.div`
  position: relative;
  max-height: 350px;
  @media ${props => props.theme.mediaQuery.medium} {
    max-height: 689px;
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    padding: 0 15px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    max-height: 576px;
  }
  @media ${props => props.theme.mediaQuery.xlarge} {
    max-height: 689px;
  }
`;
const ContentContainer = styled.div`
  @media ${props => props.theme.mediaQuery.large} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 483px;
  }
`;

const style = css`
  .content-wrapper {
    position: relative;
    text-align: center;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding: 0 15px;
    }
  }
  .headline,
  .headsubline {
    margin-bottom: 16px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 0 14px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 24px;
    }
  }
`;

export { ImgWrapper, ContentContainer, style };

export default {
  ImgWrapper,
  ContentContainer,
  style,
};
