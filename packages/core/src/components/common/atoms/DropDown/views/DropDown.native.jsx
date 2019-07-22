import React from 'react';
import { Image, View, TouchableHighlight, FlatList, TouchableWithoutFeedback } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import { style, StyledText, Row, OverLayView } from '../DropDown.style.native';

const icon = require('../../../../../assets/carrot-small-down.png');

// @flow
type Props = {
  title: string,
};

class DropDown extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      dropDownIsOpen: false,
    };
  }

  openDropDown = () => {
    this.setState({
      dropDownIsOpen: true,
    });
  };

  dropDownLayout = ({ item }) => {
    return (
      <TouchableWithoutFeedback accessibilityTraits="none" accessibilityComponentType="none">
        <View>
          <StyledText>{item.key}</StyledText>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { title } = this.props;
    const { dropDownIsOpen } = this.state;
    return (
      <View>
        <TouchableHighlight
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.openDropDown}
        >
          <Row {...this.props}>
            <StyledText>{title}</StyledText>
            <Image source={icon} />
          </Row>
        </TouchableHighlight>
        <OverLayView>
          {dropDownIsOpen && (
            <FlatList
              data={[{ key: 'hello hello hello' }, { key: 'hey hey hey' }]}
              renderItem={item => this.dropDownLayout(item)}
            />
          )}
        </OverLayView>
        <StyledText>STATESTATESTATESTATESTATESTATE</StyledText>
      </View>
    );
  }
}

export default withStyles(DropDown, style);
export { DropDown as DropDownVanilla };
