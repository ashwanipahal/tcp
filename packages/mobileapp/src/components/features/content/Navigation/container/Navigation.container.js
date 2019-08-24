import { connect } from 'react-redux';
import { fetchNavigationData } from '@tcp/core/src/components/features/content/Navigation/container/Navigation.actions';
import NavMenuLevel1View from '../molecules/NavMenuLevel1';

const mapStateToProps = state => {
  return {
    navigationMenuObj: (state.Navigation && state.Navigation.navigationData) || [],
    accessibilityLabels:
      (state.Labels && state.Labels.global && state.Labels.global.accessibility) || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNavigationData: () => dispatch(fetchNavigationData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenuLevel1View);
