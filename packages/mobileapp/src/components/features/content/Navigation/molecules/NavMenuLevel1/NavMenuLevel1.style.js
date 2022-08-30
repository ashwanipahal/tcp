import styled from 'styled-components/native';
import { Image } from '@tcp/core/src/components/common/atoms';

export const L1TouchableOpacityNoImage = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 132;
  background-color: ${props => props.theme.colorPalette.gray[300]};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const L1TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 132;
  background-color: ${props => props.theme.colorPalette.gray[300]};
`;

export const L1TextView = styled.View`
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.colorPalette.gray[300]};
  align-items: center;
  width: 50%;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const ContainerList = styled.FlatList`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const StyledImage = styled(Image)`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;
