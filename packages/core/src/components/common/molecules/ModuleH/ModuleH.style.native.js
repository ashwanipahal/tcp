import styled from 'styled-components';

export const Wrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderWrapper = styled.View`
  position: absolute;
  top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  left: 14px;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const LinksWrapper = styled.View`
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export default {
  HeaderWrapper,
  LinksWrapper,
  Wrapper,
};
