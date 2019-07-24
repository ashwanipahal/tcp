import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { SlotA, SlotB } from '../molecules';

// const MyIcon = <Icon name="rocket" size={30} color="#900" />;
class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  loginWithFacebook = () => {
    console.log('click on the icon');
  };

  render() {
    const { slot_1: slotA, slot_2: slotB } = this.props;
    return (
      <ScrollView>
        <React.Fragment>
          <CustomIcon name="rocket" size={30} color="#ff0000" isDisabled />
          <Icon name="rocket" size={30} color="#900" />
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
          <SlotA {...slotA} />
          <SlotB {...slotB} />
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slot_1: PropTypes.shape({}).isRequired,
  slot_2: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
};

export default errorBoundary(HomePageView);
