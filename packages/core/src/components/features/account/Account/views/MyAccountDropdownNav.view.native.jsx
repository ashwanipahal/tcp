import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import { navigateToNestedRoute } from '../../../../../utils/index.native';
import withStyles from '../../../../common/hoc/withStyles';
import StyledWrapper from '../styles/MyAccountDropDown.style.native';

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
class MyAccountDropdownNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownItem: 'accountOverviewMobile',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { component } = props;
    const { dropDownItem } = state;
    if (component !== dropDownItem) {
      return { dropDownItem: component };
    }
    return null;
  }

  render() {
    const { navData, handleComponentChange, className, navigation } = this.props;
    const { dropDownItem } = this.state;
    const dropDownStyle = {
      height: 49,
      border: 1,
    };
    const itemStyle = {
      height: 49,
      color: 'gray.800',
    };
    const arrowImageStyle = {
      position: 'absolute',
      right: 20,
    };
    return (
      <View className={className} {...this.props}>
        <DropDown
          selectedValue={dropDownItem}
          data={navData}
          onValueChange={itemValue => {
            this.setState({ dropDownItem: itemValue });
            if (itemValue === 'myWalletPageMobile') {
              navigateToNestedRoute(navigation, 'WalletStack', 'walletPage');
            } else {
              handleComponentChange(itemValue);
            }
          }}
          variation="primary"
          dropDownStyle={{ ...dropDownStyle }}
          itemStyle={{ ...itemStyle }}
          arrowImageStyle={{ ...arrowImageStyle }}
          bounces={false}
          selectedItemFontWeight="extrabold"
          dropDownItemFontWeight="regular"
        />
      </View>
    );
  }
}
MyAccountDropdownNav.propTypes = {
  navData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  component: PropTypes.string.isRequired,
};

export default withStyles(MyAccountDropdownNav, StyledWrapper);
export { MyAccountDropdownNav as MyAccountDropdownNavVanilla };
