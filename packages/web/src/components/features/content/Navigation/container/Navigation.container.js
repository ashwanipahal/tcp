import { connect } from 'react-redux';
import {
  openL2Panel,
  closeL2Panel,
} from '@tcp/core/src/components/features/content/Navigation/container/Navigation.actions';
import NavigationView from '../views/Navigation';

const mapStateToProps = state => {
  return {
    nav: state.Navigation.navigationData,
    openPanel: state.Navigation.openPanel,
    panelData: state.Navigation.panelData,
    order: state.Navigation.order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openL2Panel: (data, order) => () => {
      dispatch(openL2Panel(data, order));
    },
    closeL2Panel: () => {
      dispatch(closeL2Panel());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationView);
