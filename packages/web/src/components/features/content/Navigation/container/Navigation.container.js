import { connect } from 'react-redux';
import { getViewportInfo } from '@tcp/core/src/utils';
import {
  openL2Panel,
  openL2Drawer,
  hideL2Drawer,
  openL3Drawer,
  hideL3Drawer,
  hideNavigationFooter,
  showNavigationFooter,
  removeL1Focus,
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
    l3Drawer: state.Navigation.l3Drawer,
    hideNavigationFooter: state.Navigation.hideNavigationFooter,
    showDesktopOverlay: state.Navigation.showDesktopOverlay,
    removeL1Focus: state.Navigation.removeL1Focus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openL2Panel: (panelData, mainCategory, order) => () => {
      dispatch(openL2Panel(panelData, mainCategory, order));
    },
    openL2Drawer: id => () => {
      dispatch(hideNavigationFooter());
      dispatch(removeL1Focus(false));
      dispatch(openL2Drawer(id));
    },
    hideL2Drawer: id => e => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(showNavigationFooter());
      dispatch(hideL2Drawer(id));
      dispatch(removeL1Focus(true));
    },
    openL3Drawer: id => e => {
      if (!getViewportInfo().isDesktop) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(openL3Drawer(id));
      }
    },
    hideL3Drawer: id => () => {
      dispatch(hideL3Drawer(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationView);
