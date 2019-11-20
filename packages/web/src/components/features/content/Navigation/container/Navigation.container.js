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
  hideAllDrawers,
} from '@tcp/core/src/components/features/content/Navigation/container/Navigation.actions';
import { closeNavigationDrawer } from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
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
    accessibilityLabels:
      (state.Labels && state.Labels.global && state.Labels.global.accessibility) || {},
    isDrawerOpen: state.Header.navigationDrawer && state.Header.navigationDrawer.open,
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
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },

    /**
     * @arrow - hideL2Drawer
     * @params - @param - id - Navigation category id.
     * @param - e - Event object of click
     * @param - isPropagate - A boolean value for handling default event execution.
     */

    hideL2Drawer: id => (e, isPropagate) => {
      e.stopPropagation();
      if (!isPropagate) {
        e.preventDefault();
      }
      dispatch(showNavigationFooter());
      dispatch(hideL2Drawer(id));
      dispatch(removeL1Focus(true));
    },
    openL3Drawer: (id, hasL3) => e => {
      e.stopPropagation();
      if (!getViewportInfo().isDesktop && hasL3) {
        e.preventDefault();
        dispatch(openL3Drawer(id));
      }
    },
    hideL3Drawer: id => () => {
      dispatch(hideL3Drawer(id));
    },
    closeNavigationDrawer: () => {
      dispatch(hideAllDrawers());
      dispatch(closeNavigationDrawer());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationView);
