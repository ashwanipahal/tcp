import styled, { css } from 'styled-components';

const BgWrapper = styled.div`
  background-color: ${props => props.bgColor};
  height: 350px;
  @media ${props => props.theme.mediaQuery.medium} {
    height: 689px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    height: 576px;
  }
  @media ${props => props.theme.mediaQuery.xlarge} {
    height: 689px;
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
  .headsubline {
    @media ${props => props.theme.mediaQuery.large} {
      width: 450px;
    }
  }
`;

const style = css`
  margin-bottom: 120px;
  .content-wrapper {
    position: relative;
    text-align: center;
  }
  .img-txt-top {
    margin-bottom: 16px;
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 0;
    }
  }
`;

export { ContentContainer, BgWrapper, style };

export default {
  ContentContainer,
  BgWrapper,
  style,
};
