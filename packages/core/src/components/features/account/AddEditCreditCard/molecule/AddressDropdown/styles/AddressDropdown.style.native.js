import styled from 'styled-components/native';
import {
  HeaderContainer,
  Row,
  OverLayView,
  DropDownItemContainer,
} from '../../../../../../common/atoms/DropDown/DropDown.style.native';

const AddNewAddressWrapper = styled.TouchableOpacity`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const FlatList = styled.FlatList`
  flex: 1;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  background-color: ${props => props.theme.colors.WHITE};
`;

const Separator = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[500]};
  height: 1px;
`;

const BadgeWrapper = styled.View`
  position: absolute;
  right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const AddNewButton = styled.View`
  padding-left: 12px;
  padding-right: 12px;
`;

export {
  HeaderContainer,
  Row,
  OverLayView,
  DropDownItemContainer,
  Separator,
  FlatList,
  AddNewAddressWrapper,
  BadgeWrapper,
  AddNewButton,
};
