import styled from 'styled-components';

export const Wrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderWrapper = styled.View`
  position: absolute;
  top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const LinksWrapper = styled.View`
  position: absolute;
  top: 95px;
  left: 11px;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export default {
  HeaderWrapper,
  LinksWrapper,
  Wrapper,
};
