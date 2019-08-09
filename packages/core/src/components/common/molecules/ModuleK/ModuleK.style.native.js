import styled from 'styled-components';

import BodyCopy from '../../atoms/BodyCopy';

const MainWrapper = styled.View``;

const HeaderWrapper = styled.View`
  padding: 0 18px;
`;

const PromoTextBannerWrapper = styled.View`
  margin-top: 12px;
  margin-bottom: 16px;
`;

const WrapperView = styled.View`
  ${({ width }) => (width ? `width: ${width}` : '')};
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
`;

const StyledBodyCopy = styled(BodyCopy)`
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}` : '')}
`;

export {
  MainWrapper,
  HeaderWrapper,
  WrapperView,
  PromoTextBannerWrapper,
  StyledBodyCopy as BodyCopy,
};

export default {
  MainWrapper,
  WrapperView,
  HeaderWrapper,
  PromoTextBannerWrapper,
  StyledBodyCopy: BodyCopy,
};
