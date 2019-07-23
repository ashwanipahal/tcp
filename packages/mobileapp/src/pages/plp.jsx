import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import NavBarIcon from '../components/common/atoms/NavBarIcon';
import Header from '../components/common/molecules/Header';

const styles = { margin: 10 };
const Plp = () => <Text style={styles}>PLP Page</Text>;

const ProductList = Props => {
  const { navigation: props } = Props;
  const { getParam } = props;
  const productName = getParam('product');
  return (
    <React.Fragment>
      <Text>
        Product List Page
        {productName}
      </Text>
    </React.Fragment>
  );
};

ProductList.propTypes = {
  getParam: PropTypes.func,
};

ProductList.defaultProps = {
  getParam: null,
};

const PlpStack = createStackNavigator(
  {
    Plp,
    ProductList: { screen: props => <ProductList {...props} /> },
  },
  {
    defaultNavigationOptions: {
      header: props => <Header {...props} />,
      headerBackground: 'transparent',
    },
  }
);

PlpStack.navigationOptions = {
  tabBarLabel: 'shop',
  tabBarIcon: props => (
    <NavBarIcon iconActive="shop-active" iconInactive="shop-inactive" {...props} />
  ),
};

export default PlpStack;
