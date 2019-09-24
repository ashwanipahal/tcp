import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchModuleX } from '../../common/organism/PointsHistory/container/PointsHistory.actions';

import {
  getCommonLabels,
  getPointHistoryRichTextContentId,
  getPointHistoryRichTextSelector,
} from '../../common/organism/PointsHistory/container/PointsHistory.selectors';
import { getLabels } from '../../Account/container/Account.selectors';
import PointsHistoryPage from '../views';

export class PointsHistoryPageContainer extends React.PureComponent {
  componentDidMount() {
    const { pointHistoryContentId, getRichText } = this.props;
    getRichText(pointHistoryContentId);
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { labels, pointHistoryRichText, ...otherprops } = this.props;
    return (
      <PointsHistoryPage richTextContent={pointHistoryRichText} labels={labels} {...otherprops} />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getRichText: cid => {
      dispatch(fetchModuleX(cid));
    },
  };
};

export const mapStateToProps = state => {
  return {
    labels: getCommonLabels(state),
    accountLabels: getLabels(state),
    pointHistoryContentId: getPointHistoryRichTextContentId(state),
    pointHistoryRichText: getPointHistoryRichTextSelector(state),
  };
};

PointsHistoryPageContainer.propTypes = {
  labels: PropTypes.shape({}),
  pointHistoryContentId: PropTypes.string,
  pointHistoryRichText: PropTypes.string,
  getRichText: PropTypes.func,
};

PointsHistoryPageContainer.defaultProps = {
  labels: {},
  pointHistoryContentId: '',
  pointHistoryRichText: '',
  getRichText: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsHistoryPageContainer);
