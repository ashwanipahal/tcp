import React from 'react'; //eslint-disable-line
import { View, Text } from 'react-native'; //eslint-disable-line
import { StylePickerWrapper, StyledPicker } from '../styles/MyAccountLayout.style.native';

// @flow
type Props = {
  navData: Array<Object>,
  handleComponentChange: Function,
};

type State = {
  dropDownItem: String,
};
/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
class MyAccountDropdownNav extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dropDownItem: 'addressBookMobile',
    };
  }

  render() {
    const { navData, handleComponentChange } = this.props;
    const { dropDownItem } = this.state;
    return (
      <View>
        <StylePickerWrapper>
          <StyledPicker
            selectedValue={dropDownItem}
            onValueChange={itemValue => {
              this.setState({ dropDownItem: itemValue });
              handleComponentChange(itemValue);
            }}
            mode="dropdown"
          >
            {navData &&
              navData.map(nav => {
                return (
                  <StyledPicker.Item key={nav.id} label={nav.displayName} value={nav.component} />
                );
              })}
          </StyledPicker>
        </StylePickerWrapper>
      </View>
    );
  }
}

export default MyAccountDropdownNav;
