import { connect } from 'react-redux';
import {
  openL2Panel,
  openL2Drawer,
  hideL2Drawer,
} from '@tcp/core/src/components/features/content/Navigation/container/Navigation.actions';
import NavigationView from '../views/Navigation';

const mapStateToProps = state => {
  return {
    nav: state.Navigation.navigationData,
    openPanel: state.Navigation.openPanel,
    panelData: state.Navigation.panelData,
    mainCategory: state.Navigation.mainCategory,
    order: state.Navigation.order,
    openDrawer: state.Navigation.openDrawer,
    closeDrawer: state.Navigation.closeDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openL2Panel: (panelData, mainCategory, order) => () => {
      dispatch(openL2Panel(panelData, mainCategory, order));
    },
    openL2Drawer: id => () => {
      dispatch(openL2Drawer(id));
    },
    hideL2Drawer: id => e => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(hideL2Drawer(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationView);
