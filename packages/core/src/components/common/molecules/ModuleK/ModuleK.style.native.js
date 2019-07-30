import styled from 'styled-components';

import BodyCopy from '../../atoms/BodyCopy';

const MainWrapper = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM} 14px;
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

export { MainWrapper, WrapperView, PromoTextBannerWrapper, StyledBodyCopy as BodyCopy };

export default {
  MainWrapper,
  WrapperView,
  PromoTextBannerWrapper,
  StyledBodyCopy: BodyCopy,
};
