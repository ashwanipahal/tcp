import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import { SlotA, SlotB, SlotC, SlotD, SlotF } from '../molecules';

import moduleNMockData from '../../../../../../../core/src/services/abstractors/common/moduleN/mock';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const {
      slot_1: slotA,
      slot_2: slotB,
      slot_3: slotC,
      slot_4: slotD,
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
          <SlotF
            name="moduleN"
            set={moduleNMockData.set}
            {...moduleNMockData.composites}
            {...slotF}
            navigation={navigation}
          />
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
  navigation: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
};

HomePageView.defaultProps = {
  slot_1: {},
  slot_2: {},
  slot_3: {},
  slot_4: {},
  slot_6: {},
};

export default HomePageView;
