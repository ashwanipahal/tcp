import styled from 'styled-components/native';

export const L1TouchableOpacityNoImage = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  flex-direction: row;
  height: 132;
  background-color: ${props => props.theme.colorPalette.gray[300]};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const L1TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  flex-direction: row;
  height: 132;
  background-color: ${props => props.theme.colorPalette.gray[300]};
`;

export const L1TextView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.colorPalette.gray[300]};
`;

export const ContainerList = styled.FlatList`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
