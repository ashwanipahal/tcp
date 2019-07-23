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

const downIcon = require('../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../assets/carrot-small-up.png');

// @flow
type Props = {
  data: Array,
  selectedValue: string,
  onValueChange: () => void,
  containerStyle: Object,
};

class DropDown extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.width = -1;
    this.leftMargin = -1;
    this.topMargin = -1;

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

  findDimensions = () => {
    if (this.marker) {
      this.marker.measure((x, y, width, height, pageX, pageY) => {
        this.width = width;
        this.leftMargin = pageX;

        // calculate this
        this.topMargin = height + pageY;
      });
    }
  };

  render() {
    const { data, containerStyle } = this.props;
    const { dropDownIsOpen, selectedLabelState } = this.state;

    return (
      <View style={containerStyle}>
        <Row
          {...this.props}
          onStartShouldSetResponder={() => this.openDropDown()}
          ref={ref => {
            this.marker = ref;
          }}
          onLayout={() => this.findDimensions()}
        >
          <HeaderText>{selectedLabelState}</HeaderText>
          <Image source={dropDownIsOpen ? upIcon : downIcon} />
        </Row>
        <Modal visible={dropDownIsOpen} transparent>
          <StyledTouchableOpacity
            accessibilityTraits="none"
            accessibilityComponentType="none"
            onPress={this.closeDropDown}
            activeOpacity={1}
            style={{ width: this.width, left: this.leftMargin, top: this.topMargin }}
          >
            <OverLayView style={containerStyle}>
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
