import { connect } from 'react-redux';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import { capitalize } from '@tcp/core/src/utils';
import HelpCenterView from '../views/HelpCenter.view';

HelpCenterView.getInitialProps = async ({ store, isServer }, pageProps) => {
  const state = store.getState();
  if (!isServer && !state.Layouts.helpcenterpage) {
    store.dispatch(fetchPageLayout('helpcenterpage'));
  }
  return pageProps;
};

HelpCenterView.pageInfo = {
  pageId: 'Help Center',
  name: 'helpcenterpage',
};

const mapStateToProps = state => {
  // TO DO - Replace the mock with the state.
  const { Layouts, Modules, SubNavigation } = state;
  const helpCenterPageSlots = Layouts.helpcenterpage ? Layouts.helpcenterpage.slots : [];
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
            Modules[contentId] && Modules[contentId].val
              ? capitalize(Modules[contentId].val)
                  .split(' ')
                  .join('')
              : '';
          response.data.slot.push(
            Modules[contentId] && Modules[contentId].moduleName !== 'placeholder'
              ? Modules[contentId]
              : {
                  ...Modules[contentId],
                  [placeHolderName]: SubNavigation[placeHolderName],
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

export default connect(mapStateToProps)(HelpCenterView);
