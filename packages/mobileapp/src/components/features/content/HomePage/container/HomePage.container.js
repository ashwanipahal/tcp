import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import { createAPIConfig } from '@tcp/core/src/utils';
import HomePageView from '../views';
import TCP_ENV from '../../../../../env/tcp_env';
import GYM_ENV from '../../../../../env/gym_env';
import { APP_TYPE, THEME_WRAPPER_REDUCER_KEY } from '../../../../common/hoc/ThemeWrapper.constants';

const mapStateToProps = state => {
  const headerPromo = state.Header && state.Header.promoTextBannerCarousel;
  const homepageSlots = state.Layouts.homepage ? state.Layouts.homepage.slots : '';
  const modules = state.Modules ? state.Modules : '';
  const moduleSlots = {};

  if (homepageSlots && Object.keys(modules).length) {
    homepageSlots.forEach(slotItem => {
      moduleSlots[slotItem.name] = modules[slotItem.contentId];
      moduleSlots[slotItem.name].name = slotItem.moduleName;
      return moduleSlots;
    });
  }
  return {
    ...moduleSlots,
    headerPromo,
    appType: state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBootstrapData: (pages, appType) => {
      const envConfig = appType === APP_TYPE.TCP ? TCP_ENV : GYM_ENV;
      const apiConfig = createAPIConfig(envConfig);
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
