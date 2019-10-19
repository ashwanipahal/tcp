import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPrefrence from '../views';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.preferences) || {};
};

export class MyPrefrenceContainer extends PureComponent {
  render() {
    const { labels, handleComponentChange, componentProps, router } = this.props;
    const urlParams = router.query || {};
    const myPrefrenceLabels = getMyPrefrenceLabels(labels);
    return (
      <MyPrefrence
        labels={myPrefrenceLabels}
        handleComponentChange={handleComponentChange}
        componentProps={componentProps}
        urlParams={urlParams}
      />
    );
  }
}

MyPrefrenceContainer.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
  router: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
};

MyPrefrenceContainer.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
  router: {},
};

export default connect()(MyPrefrenceContainer);
