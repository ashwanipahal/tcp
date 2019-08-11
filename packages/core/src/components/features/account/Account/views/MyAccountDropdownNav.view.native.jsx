import React from 'react';
import { View } from 'react-native';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import withStyles from '../../../../common/hoc/withStyles';
import StyledWrapper from '../styles/MyAccountDropDown.style.native';
// @flow
type Props = {
  navData: Array<Object>,
  handleComponentChange: Function,
  className: string,
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
      dropDownItem: 'accountOverviewMobile',
    };
  }

  render() {
    const { navData, handleComponentChange, className } = this.props;
    const { dropDownItem } = this.state;
    const dropDownStyle = {
      height: 49,
      border: 1,
    };
    const itemStyle = {
      height: 49,
    };
    return (
      <View className={className} {...this.props}>
        <DropDown
          selectedValue={dropDownItem}
          data={navData}
          onValueChange={itemValue => {
            this.setState({ dropDownItem: itemValue });
            handleComponentChange(itemValue);
          }}
          variation="primary"
          dropDownStyle={{ ...dropDownStyle }}
          itemStyle={{ ...itemStyle }}
        />
      </View>
    );
  }
}

export default withStyles(MyAccountDropdownNav, StyledWrapper);
export { MyAccountDropdownNav as MyAccountDropdownNavVanilla };
