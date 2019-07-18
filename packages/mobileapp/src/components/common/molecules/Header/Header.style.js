import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex-direction: row;
  height: 40px;
  flex: 1;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  display: flex;
  background: white;
`;

export const VerticalLeftView = styled.View`
  align-items: flex-start;
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  justify-content: space-between;
  margin-top: 10px;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const VerticalRightView = styled.TouchableOpacity`
  align-items: flex-end;
  flex-direction: column;
  align-self: flex-end;
  flex-basis: 100%;
  display: flex;
`;

export const HorizontalView = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Icon = styled.Image`
  width: ${props => props.width || '9px'};
  height: ${props => props.width || '5px'};
  border-radius: ${props => props.borderRadius || 0};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  background-color: ${props => props.background || 'transparent'};
`;

export const RoundView = styled.View`
  ${props =>
    props.color === 'white'
      ? `
    background-color: ${props.theme.colorPalette.white};
          `
      : ''};
  ${props =>
    props.color === 'TCP'
      ? `
    background-color: ${props.theme.colorPalette.primary.dark};
          `
      : ''};
  ${props =>
    props.color === 'Gymboree'
      ? `
        background-color: ${'#c25621'};
              `
      : ''};
  width: ${props => props.width || '20px'};
  height: ${props => props.height || '20px'};
  border-radius: ${props => props.borderRadius || 10};
  position: absolute;
  margin-top: 14px;
`;

export default {
  Wrapper,
  VerticalRightView,
  HorizontalView,
  Icon,
  VerticalLeftView,
  RoundView,
};
