import styled from 'styled-components';

export const HeaderWrapper = styled.View`
  position: absolute;
  top: 25px;
  left: 11px;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const Header = styled.Text`
  color: ${props => props.theme.colors.WHITE};
  font-size: ${props => props.theme.fonts.fontSize.heading.large.h3}px;
  font-weight: bold;
  line-height: 34px;
  margin-top: ${props => (props.lineOrder > 0 ? props.theme.spacing.ELEM_SPACING.XL : 0)};
`;

export const LinksWrapper = styled.View`
  background: transparent;
  position: absolute;
  top: 86px;
  left: 11px;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export default {
  Header,
  HeaderWrapper,
  LinksWrapper,
};
