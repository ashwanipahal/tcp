import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import { MODULES_CONSTANT } from '@tcp/core/src/reduxStore/constants';
import { createLayoutPath } from '@tcp/core/src/utils';
import HelpCenterView from '../views/HelpCenter.view';
import constants from '../HelpCenter.constants';

HelpCenterView.getInitialProps = async ({ store, isServer, query }, pageProps) => {
  const state = store.getState();
  const { pageName = constants.HELP_CENTER_HOME_PATH } = query;
  const formattedPageName = createLayoutPath(pageName);
  if (!isServer && !state.Layouts[formattedPageName]) {
    store.dispatch(fetchPageLayout(pageName));
  }
  return pageProps;
};

HelpCenterView.pageInfo = {
  // pageId: 'Help Center',
  name: constants.HELP_CENTER_HOME_PATH,
  staticPage: true,
  paramName: 'pageName',
  defaultName: constants.HELP_CENTER_HOME_PATH,
};

const mapStateToProps = (state, props) => {
  // TO DO - Replace the mock with the state.
  const {
    router: {
      query: { pageName = constants.HELP_CENTER_HOME_PATH },
    },
  } = props;
  const { Layouts, Modules } = state;
  const formattedPageName = createLayoutPath(pageName);
  const helpCenterPageSlots = Layouts[formattedPageName] ? Layouts[formattedPageName].slots : [];

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
          const placeHolderName =
            Modules[contentId] && Modules[contentId].val ? Modules[contentId].val : '';
          response.data.slot.push(
            Modules[contentId] && Modules[contentId].moduleName !== MODULES_CONSTANT.placeholder
              ? Modules[contentId]
              : {
                  ...Modules[contentId],
                  [placeHolderName]: state[Modules[contentId].moduleClassName][placeHolderName],
                }
          );
        });

        return response;
      }
      return {
        ...slot,
        data: Modules[slot.contentId],
      };
    }),
    labels: state.Labels.HelpCenter,
  };
};

export default withRouter(connect(mapStateToProps)(HelpCenterView));
