import React from 'react';
import { View } from 'react-native';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import MyAccountDropdownNav from './MyAccountDropdownNav.view';
import ParentContainer from '../styles/MyAccountLayout.style.native';
import withStyles from '../../../../common/hoc/withStyles';

// @flow
type Props = {
  navData: Array<Object>,
  mainContent: Function,
  handleComponentChange: Function,
  className: string,
  labels: object,
  isUserLoggedIn: string,
  navigation: object,
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of drop down
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the drop down nav as config object
 * @param {mainContent} mainContent The component to be rendered on the below side
 */

const MyAccountLayoutView = (props: Props) => {
  const {
    navData,
    mainContent: MainContent,
    handleComponentChange,
    className,
    labels,
    isUserLoggedIn,
    navigation,
  } = props;
  return (
    <View className={className} {...props}>
      {!isUserLoggedIn && (
        <React.Fragment>
          <RewardsPoints tableView labels={labels} />
          <MyAccountDropdownNav navData={navData} handleComponentChange={handleComponentChange} />
        </React.Fragment>
      )}
      <MainContent
        isUserLoggedIn={isUserLoggedIn}
        labels={labels}
        handleComponentChange={handleComponentChange}
        navigation={navigation}
      />
    </View>
  );
};

export default withStyles(MyAccountLayoutView, ParentContainer);
export { MyAccountLayoutView as MyAccountLayoutViewVanilla };
