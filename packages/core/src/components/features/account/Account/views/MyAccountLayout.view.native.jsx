import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import MyAccountDropdownNav from './MyAccountDropdownNav.view';
import ParentContainer from '../styles/MyAccountLayout.style.native';
import withStyles from '../../../../common/hoc/withStyles';

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of drop down
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the drop down nav as config object
 * @param {mainContent} mainContent The component to be rendered on the below side
 */

const MyAccountLayoutView = props => {
  const {
    navData,
    mainContent: MainContent,
    handleComponentChange,
    className,
    labels,
    isUserLoggedIn,
    navigation,
    component,
    componentProps,
  } = props;
  return (
    <View className={className} {...props}>
      {!isUserLoggedIn && (
        <React.Fragment>
          <RewardsPoints tableView labels={labels} />
          <MyAccountDropdownNav
            navData={navData}
            component={component}
            handleComponentChange={handleComponentChange}
            navigation={navigation}
          />
        </React.Fragment>
      )}
      <MainContent
        isUserLoggedIn={isUserLoggedIn}
        labels={labels}
        handleComponentChange={handleComponentChange}
        navigation={navigation}
        componentProps={componentProps}
      />
    </View>
  );
};

MyAccountLayoutView.propTypes = {
  navData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mainContent: PropTypes.func.isRequired,
  handleComponentChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  component: PropTypes.string.isRequired,
  componentProps: PropTypes.shape({}).isRequired,
};

export default withStyles(MyAccountLayoutView, ParentContainer);
export { MyAccountLayoutView as MyAccountLayoutViewVanilla };
