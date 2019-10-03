import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPrefrence from '../views';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.preferences) || {};
};

export class MyPrefrenceContainer extends PureComponent {
  render() {
    const { labels, handleComponentChange, componentProps } = this.props;
    const myPrefrenceLabels = getMyPrefrenceLabels(labels);
    return (
      <MyPrefrence
        labels={myPrefrenceLabels}
        handleComponentChange={handleComponentChange}
        componentProps={componentProps}
      />
    );
  }
}

MyPrefrenceContainer.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
};

MyPrefrenceContainer.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
};

export default connect()(MyPrefrenceContainer);
