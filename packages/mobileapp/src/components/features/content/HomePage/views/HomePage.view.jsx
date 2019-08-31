import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import { SlotA, SlotB, SlotC, SlotD, SlotE, SlotF } from '../molecules';

class HomePageView extends React.PureComponent<Props> {
  componentDidMount() {
    this.loadData();
    this.addDidFocusListener();
  }

  componentWillUnmount() {
    // Remove the listener when you are done
    this.didBlurSubscription.remove();
  }

  addDidFocusListener = () => {
    const { slot_1: slotA, navigation } = this.props;
    if (!navigation.addListener) return;
    this.didBlurSubscription = navigation.addListener('didFocus', () => {
      if (navigation.isFocused() && !Object.keys(slotA).length) {
        this.loadData();
      }
    });
  };

  /**
   * @function loadBootstrapData
   * Loads bootstrap data
   *
   * @memberof HomePageView
   */
  loadData = () => {
    const {
      getBootstrapData,
      screenProps: { apiConfig },
    } = this.props;
    getBootstrapData(
      {
        name: 'homepage',
        modules: ['labels', 'header'],
      },
      apiConfig
    );
  };

  render() {
    const {
      slot_1: slotA,
      slot_2: slotB,
      slot_3: slotC,
      slot_4: slotD,
      slot_5: slotE,
      slot_6: slotF,
      navigation,
    } = this.props;
    return (
      <ScrollView>
        <React.Fragment>
          {slotA && <SlotA {...slotA} navigation={navigation} />}
          {slotB && <SlotB {...slotB} navigation={navigation} />}
          {slotC && <SlotC {...slotC} navigation={navigation} />}
          {slotD && <SlotD {...slotD} navigation={navigation} />}
          {slotE && <SlotE {...slotE} navigation={navigation} />}
          {slotF && <SlotF {...slotF} navigation={navigation} />}
          <Button
            fullWidth
            buttonVariation="variable-width"
            text="PLP Page"
            onPress={() => navigation.navigate('ProductListingPageContainer')}
          />
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slot_1: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_2: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_3: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_4: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_6: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_5: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  navigation: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
  appType: PropTypes.string.isRequired,
  screenProps: PropTypes.shape({}),
};

HomePageView.defaultProps = {
  slot_1: {},
  slot_2: {},
  slot_3: {},
  slot_4: {},
  slot_5: {},
  slot_6: {},
  screenProps: {},
};

export default HomePageView;
