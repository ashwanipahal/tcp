import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import ModuleN from '@tcp/core/src/components/common/molecules/ModuleN/views/ModuleN.native';
import { SlotA, SlotB, SlotC, SlotD } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const {
      getBootstrapData,
      screenProps: { apiConfig },
    } = this.props;
    getBootstrapData({ name: 'homepage' }, apiConfig);
  }

  render() {
    const { slot_1: slotA, slot_2: slotB, slot_3: slotC, slot_4: slotD, navigation } = this.props;
    return (
      <ScrollView>
        <React.Fragment>
          <ModuleN navigation={navigation} />
          {slotA && <SlotA {...slotA} navigation={navigation} />}
          {slotB && <SlotB {...slotB} navigation={navigation} />}
          {slotC && <SlotC {...slotC} navigation={navigation} />}
          {slotD && <SlotD {...slotD} navigation={navigation} />}
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
  screenProps: {},
};

export default HomePageView;
