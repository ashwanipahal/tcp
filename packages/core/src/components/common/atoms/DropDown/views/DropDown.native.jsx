import React from 'react';
import { Image, View, FlatList, Modal } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import {
  style,
  HeaderText,
  Row,
  OverLayView,
  DropDownItem,
  Separator,
  StyledTouchableOpacity,
} from '../DropDown.style.native';

const icon = require('../../../../../assets/carrot-small-down.png');

// @flow
type Props = {
  data: Array,
  selectedValue: String,
  onValueChange: Function,
};

class DropDown extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    const { data, selectedValue } = this.props;
    const selectedObject = data.filter(item => {
      return item.value === selectedValue;
    });

    this.state = {
      dropDownIsOpen: false,
      selectedLabelState: selectedObject[0].label,
    };
  }

  openDropDown = () => {
    this.setState({
      dropDownIsOpen: true,
    });
  };

  dropDownLayout = ({ item }) => {
    return <DropDownItem onPress={() => this.onDropDownItemClick(item)}>{item.label}</DropDownItem>;
  };

  onDropDownItemClick = item => {
    this.setState({
      dropDownIsOpen: false,
      selectedLabelState: item.label,
    });

    // pass the callback here with value
    const { onValueChange } = this.props;
    onValueChange(item.value);
  };

  closeDropDown = () => {
    this.setState({
      dropDownIsOpen: false,
    });
  };

  render() {
    const { data } = this.props;
    const { dropDownIsOpen, selectedLabelState } = this.state;

    return (
      <View>
        <Row {...this.props} onStartShouldSetResponder={() => this.openDropDown()}>
          <HeaderText>{selectedLabelState}</HeaderText>
          <Image source={icon} />
        </Row>
        <Modal visible={dropDownIsOpen} transparent>
          <StyledTouchableOpacity
            accessibilityTraits="none"
            accessibilityComponentType="none"
            onPress={this.closeDropDown}
            activeOpacity={1}
          >
            <OverLayView>
              {dropDownIsOpen && (
                <FlatList
                  data={data}
                  renderItem={item => this.dropDownLayout(item)}
                  ItemSeparatorComponent={() => <Separator />}
                />
              )}
            </OverLayView>
          </StyledTouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default withStyles(DropDown, style);
export { DropDown as DropDownVanilla };
