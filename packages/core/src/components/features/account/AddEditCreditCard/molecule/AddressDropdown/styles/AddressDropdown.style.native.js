import styled from 'styled-components/native';
import {
  HeaderContainer,
  Row,
  OverLayView,
  DropDownItemContainer,
  Separator,
  FlatList,
} from '../../../../../../common/atoms/DropDown/DropDown.style.native';

const AddNewAddressWrapper = styled.TouchableOpacity`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export {
  HeaderContainer,
  Row,
  OverLayView,
  DropDownItemContainer,
  Separator,
  FlatList,
  AddNewAddressWrapper,
};
