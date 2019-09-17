import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BillingPage from '../views';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';

import {
  getCVVCodeInfoContentId,
  getCVVCodeRichTextSelector,
  getBillingLabels,
} from './BillingPage.selectors';

class BillingPageContainer extends React.Component {
  componentDidMount() {
    const { cvvCodeInfoContentId, getCVVCodeInfo } = this.props;
    /* istanbul ignore else */
    if (cvvCodeInfoContentId) {
      getCVVCodeInfo([cvvCodeInfoContentId]);
    }
  }

  render() {
    return <BillingPage {...this.props} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCVVCodeInfo: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
  };
};

export const mapStateToProps = state => {
  return {
    cvvCodeInfoContentId: getCVVCodeInfoContentId(state),
    cvvCodeRichText: getCVVCodeRichTextSelector(state),
    labels: getBillingLabels(state),
  };
};

BillingPageContainer.propTypes = {
  cvvCodeInfoContentId: PropTypes.string,
  getCVVCodeInfo: PropTypes.func,
};

BillingPageContainer.defaultProps = {
  cvvCodeInfoContentId: null,
  getCVVCodeInfo: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingPageContainer);
export { BillingPageContainer as BillingPageContainerVanilla };
