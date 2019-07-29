import styled from 'styled-components/native';

export const PromoAndArrowContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px 0 0;
`;

export const PromoContainer = styled.View`
  background: ${props => props.theme.colorPalette.primary.main};
  border-radius: 5px;
  width: 150px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;
