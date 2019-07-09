import React from 'react';
import { Picker, StyleSheet } from 'react-native';
import { StylePickerWrapper } from '../styles/MyAccountLayout.style';

// @flow
type Props = {
  navData: Array<Object>,
  handleComponentChange: Function,
};

type State = {
  dropDownItem: String,
};

const styles = StyleSheet.create({
  pickerHeight: {
    height: 48,
  },
  pickerItemHeight: {
    height: 48,
  },
});

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
      <StylePickerWrapper>
        <Picker
          selectedValue={dropDownItem}
          onValueChange={itemValue => {
            this.setState({ dropDownItem: itemValue });
            handleComponentChange(itemValue);
          }}
          mode="dropdown"
          style={styles.pickerHeight}
          itemStyle={styles.pickerItemHeight}
        >
          {navData &&
            navData.map(nav => {
              return <Picker.Item key={nav.id} label={nav.displayName} value={nav.component} />;
            })}
        </Picker>
      </StylePickerWrapper>
    );
  }
}

export default MyAccountDropdownNav;
