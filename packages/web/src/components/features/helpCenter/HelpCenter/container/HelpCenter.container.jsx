import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import HelpCenterView from '../views/HelpCenter.view';
import mock from './mock';

/* eslint-disable no-unused-vars */
HelpCenterView.getInitialProps = async ({ store, isServer }, pageProps) => {
  // const state = store.getState();
  // TO DO - UNCOMMENT THE BELOW CODE AFTER CMS INTEGRATION
  // if (!isServer && !state.Layouts.helpCenterPage) {
  // eslint-disable-next-line extra-rules/no-commented-out-code
  //   store.dispatch(fetchPageLayout('helpCenterPage'));
  // }
  return pageProps;
};

HelpCenterView.propTypes = {
  slots: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}),
};

HelpCenterView.defaultProps = {
  labels: {},
};

const mapStateToProps = state => {
  // TO DO - Replace the mock with the state.
  const { Layouts, HelpCenterReducer } = mock;
  const helpCenterPageSlots = Layouts.helpCenterPage ? Layouts.helpCenterPage.slots : [];
  return {
    slots: helpCenterPageSlots.map(slot => {
      const { contentId: slotContent = '' } = slot;
      const contentIds = slotContent && slotContent.split(',');
      if (contentIds && contentIds.length > 1) {
        const response = {
          ...slot,
          data: {
            slot: [],
          },
        };

        contentIds.forEach(contentId => {
          response.data.slot.push(HelpCenterReducer[contentId]);
        });

        return response;
      }
      return {
        ...slot,
        data: HelpCenterReducer[slot.contentId],
      };
    }),
    labels: state.Labels.HelpCenter,
  };
};

export default connect(mapStateToProps)(HelpCenterView);
