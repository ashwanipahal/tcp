import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import HomePageView from '../views/HomePage.view';
import { initActions } from './HomePage.actions';

export class HomePage extends React.PureComponent {
  componentDidUpdate() {
    const { isUserLoggedIn, openOverlay } = this.props;
    if (isUserLoggedIn === false) {
      openOverlay({
        component: 'login',
        componentProps: 'login',
      });
    }
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    return <HomePageView {...this.props} />;
  }
}

HomePage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  openOverlay: PropTypes.func,
};

HomePage.defaultProps = {
  openOverlay: () => {},
};

HomePage.getInitialProps = async ({ store, isServer }, pageProps) => {
  const state = store.getState();
  if (!isServer && !state.Layouts.homepage) {
    store.dispatch(fetchPageLayout('homepage'));
  }
  return pageProps;
};

HomePage.getInitActions = () => initActions;

HomePage.pageInfo = {
  pageId: 'Home',
  name: 'homepage',
  pageData: {
    pageName: 'home page',
    pageSection: 'homepage',
  },
  modules: ['labels', 'header', 'footer', 'navigation'],
};

export const mapDispatchToProps = dispatch => {
  return {
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
};

const mapStateToProps = state => {
  const { Layouts, Modules } = state;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots || [] : [];
  const accessibility = state.Labels && state.Labels.global && state.Labels.global.accessibility;

  return {
    slots: homepageSlots.map(slot => {
      // Logic for accomodating two modules in one slot (Half width modules view)
      const { contentId: slotContent = '' } = slot;
      const contentIds = slotContent && slotContent.split(',');
      if (contentIds && contentIds.length > 1) {
        const response = {
          ...slot,
          accessibility,
          data: {
            slot: [],
          },
        };

        contentIds.forEach(contentId => {
          response.data.slot.push(Modules[contentId]);
        });

        return response;
      }
      // Logic ends

      return {
        ...slot,
        accessibility,
        data: Modules[slot.contentId],
      };
    }),
    isUserLoggedIn: getUserLoggedInState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageView);
