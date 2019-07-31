import styled from 'styled-components/native';

export const HeadingView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
  border-bottom-color: ${props => props.theme.colorPalette.gray[600]};
  border-bottom-width: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
`;

export const ArrowBackIcon = styled.Image`
  width: 16px;
  height: 24px;
`;

export const TouchableOpacityArrow = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;
