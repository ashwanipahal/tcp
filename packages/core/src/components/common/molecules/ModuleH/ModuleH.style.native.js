import styled from 'styled-components';

export const Wrapper = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM} 0;
`;

export const HeaderWrapper = styled.View`
  position: absolute;
  top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const Header = styled.Text`
  color: ${props => props.theme.colors.WHITE};
  font-size: ${props => props.theme.fonts.fontSize.heading.large.h3}px;
  font-weight: bold;
  line-height: 34px;
`;

export const LinksWrapper = styled.View`
  position: absolute;
  top: 86px;
  left: 11px;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export default {
  Header,
  HeaderWrapper,
  LinksWrapper,
  Wrapper,
};
