import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SMSNotificationForm from '../views';
import SMSNotificationSelectors from './SMSNotifications.selectors';
import { toastMessageInfo } from '../../../../../../common/atoms/Toast/container/Toast.actions.native';
import { smsNotification, resetNotificationErr } from '../../../container/Confirmation.actions';
import { isCanada, isTCP } from '../../../../../../../utils';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';

/**
 * @function SMSNotificationFormContainer
 * @param {Object} props
 * @return {JSX} Render Container
 */

export class SMSNotificationFormContainer extends React.Component {
  static propTypes = {
    labels: PropTypes.shape({}).isRequired,
    navigation: PropTypes.shape({}).isRequired,
    notificationCarrierMessage: PropTypes.shape({}),
    isChildrenPalace: PropTypes.bool,
    isGymboree: PropTypes.bool,
    resetNotificationErrorState: PropTypes.func.isRequired,
    smsNotificationSubmit: PropTypes.func.isRequired,
    subscribeSuccessMsg: PropTypes.string,
    smsNotificationSuccess: PropTypes.bool,
    smsNotificationError: PropTypes.string,
    fetchContent: PropTypes.func.isRequired,
    notificationMsgContentId: PropTypes.string,
    subscribeSuccessMsgContentId: PropTypes.string,
  };

  static defaultProps = {
    notificationCarrierMessage: null,
    isChildrenPalace: false,
    isGymboree: false,
    subscribeSuccessMsg: null,
    smsNotificationSuccess: false,
    smsNotificationError: null,
    notificationMsgContentId: null,
    subscribeSuccessMsgContentId: null,
  };

  /**
   * @function componentDidMount
   * called when component is mount and calls getInitialProps method of wrapped component
   * and adds didFocus listener to the view which is called every time view is displayed
   *
   */
  componentDidMount() {
    const { notificationMsgContentId, fetchContent, subscribeSuccessMsgContentId } = this.props;
    fetchContent([notificationMsgContentId, subscribeSuccessMsgContentId]);
  }

  /**
   * renders wrapped component
   *
   * @returns
   */
  render() {
    const { notificationCarrierMessage, labels, navigation, isChildrenPalace } = this.props;
    const {
      isGymboree,
      resetNotificationErrorState,
      smsNotificationSubmit,
      subscribeSuccessMsg,
      smsNotificationSuccess,
      smsNotificationError,
    } = this.props;
    return (
      <SMSNotificationForm
        labels={labels}
        notificationCarrierMessage={notificationCarrierMessage}
        navigation={navigation}
        isChildrenPalace={isChildrenPalace}
        isGymboree={isGymboree}
        resetNotificationErrorState={resetNotificationErrorState}
        smsNotificationSubmit={smsNotificationSubmit}
        subscribeSuccessMsg={subscribeSuccessMsg}
        smsNotificationSuccess={smsNotificationSuccess}
        smsNotificationError={smsNotificationError}
        isTCP={isTCP()}
        isCanada={isCanada()}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    smsNotificationSubmit: payload => {
      dispatch(smsNotification(payload));
    },
    resetNotificationErrorState: () => {
      dispatch(resetNotificationErr());
    },
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
    fetchContent: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
  };
};

const mapStateToProps = state => {
  return {
    initialValues: {},
    labels: SMSNotificationSelectors.getConfirmationNotificationLabels(state),
    smsNotificationSuccess: SMSNotificationSelectors.getSmsNotificationSuccess(state),
    smsNotificationError: SMSNotificationSelectors.getSmsNotificationError(state),
    notificationCarrierMessage: SMSNotificationSelectors.getNotificationRichTextSelector(state),
    isChildrenPalace: SMSNotificationSelectors.getChildrenPalaceKey(state),
    isGymboree: SMSNotificationSelectors.getGymboreeKey(state),
    subscribeSuccessMsg: SMSNotificationSelectors.getSubscribeSuccessMsgRichTextSelector(state),
    notificationMsgContentId: SMSNotificationSelectors.getNotificationMsgContentId(state),
    subscribeSuccessMsgContentId: SMSNotificationSelectors.getSubscribeSuccessMsgContentId(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SMSNotificationFormContainer);
