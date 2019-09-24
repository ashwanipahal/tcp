import { connect } from 'react-redux';
import NavMenuLevel1View from '../molecules/NavMenuLevel1';
import { THEME_WRAPPER_REDUCER_KEY } from '../../../../common/hoc/ThemeWrapper.constants';

const mapStateToProps = state => {
  return {
    navigationMenuObj: (state.Navigation && state.Navigation.navigationData) || [],
    accessibilityLabels:
      (state.Labels && state.Labels.global && state.Labels.global.accessibility) || {},
    appType: state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE'),
  };
};

export default connect(mapStateToProps)(NavMenuLevel1View);
