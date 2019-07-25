import { connect } from 'react-redux';
import {
  openL2Panel,
  closeL2Panel,
} from '@tcp/core/src/components/features/content/Navigation/container/Navigation.actions';
import NavigationView from '../views/Navigation';

const mapStateToProps = state => {
  return {
    openPanel: state.Navigation.openPanel,
    panelData: state.Navigation.panelData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openL2Panel: data => () => {
      dispatch(openL2Panel(data));
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
