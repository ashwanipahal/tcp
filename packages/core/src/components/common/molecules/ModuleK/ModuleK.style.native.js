import styled from 'styled-components';

import BodyCopy from '../../atoms/BodyCopy';

const MainWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const HeaderWrapper = styled.View`
  padding: 0 18px;
`;

const PromoTextBannerWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const WrapperView = styled.View`
  ${({ width }) =>
    width
      ? `
width: $ {
  width
}
`
      : ''};
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: -3px;
`;

const StyledBodyCopy = styled(BodyCopy)`
  ${({ lineHeight }) =>
    lineHeight
      ? `
line - height: $ {
  lineHeight
}
`
      : ''}
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
