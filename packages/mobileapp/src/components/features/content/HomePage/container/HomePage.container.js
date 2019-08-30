import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

import { THEME_WRAPPER_REDUCER_KEY } from '../../../../common/hoc/ThemeWrapper.constants';

const mapStateToProps = state => {
  const { Header = {}, Layouts = {}, Modules = {} } = state;
  const headerPromo = Header.promoTextBannerCarousel;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots : [];

  return {
    slots: homepageSlots
      .map(slot => {
        return {
          ...slot,
          data: Modules[slot.contentId],
        };
      })
      .filter(item => item.data),
    headerPromo,
    appType: state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBootstrapData: (pages, apiConfig) => {
      const payload = {
        ...pages,
        apiConfig,
      };
      dispatch(bootstrapData(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageView);
