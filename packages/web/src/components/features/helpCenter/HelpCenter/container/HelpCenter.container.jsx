import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import HelpCenterTemplate from '@tcp/core/src/components/common/organisms/HelpCenterTemplate';
import HelpTabs from '@tcp/core/src/components/common/molecules/HelpTabs';
import mock from './mock';

export class HelpCenterContainer extends PureComponent {
  generateTabs = slots => {
    const filteredSlots = slots.filter(slot => slot.moduleName === 'helpCenterHome');
    return filteredSlots[0].data.map(slotData => slotData.leafLink);
  };

  render() {
    const { slots, labels } = this.props;
    const tabProps = {
      tabs: this.generateTabs(slots),
    };
    // TO DO - Implement Left navigation pannel part of another story
    return <HelpCenterTemplate childProps={tabProps} mainContent={HelpTabs} labels={labels} />;
  }
}
/* eslint-disable no-unused-vars */
HelpCenterContainer.getInitialProps = async ({ store, isServer }, pageProps) => {
  // const state = store.getState();
  // TO DO - UNCOMMENT THE BELOW CODE AFTER CMS INTEGRATION
  // if (!isServer && !state.Layouts.helpCenterPage) {
  // eslint-disable-next-line extra-rules/no-commented-out-code
  //   store.dispatch(fetchPageLayout('helpCenterPage'));
  // }
  return pageProps;
};

HelpCenterContainer.propTypes = {
  slots: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}),
};

HelpCenterContainer.defaultProps = {
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

export default connect(mapStateToProps)(HelpCenterContainer);
