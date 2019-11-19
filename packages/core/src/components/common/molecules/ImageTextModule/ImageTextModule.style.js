import styled, { css } from 'styled-components';

const ImgWrapper = styled.div`
  position: relative;
  max-height: 350px;
  @media ${props => props.theme.mediaQuery.medium} {
    max-height: 689px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    max-height: 576px;
  }
  @media ${props => props.theme.mediaQuery.xlarge} {
    max-height: 689px;
  }
`;
const PromoBannerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const style = css`
  .image-col {
    position: relative;
  }
`;

export { ImgWrapper, PromoBannerWrapper, style };

export default {
  ImgWrapper,
  PromoBannerWrapper,
  style,
};
