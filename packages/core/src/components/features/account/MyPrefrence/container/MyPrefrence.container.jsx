import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPrefrence from '../views/MyPrefrence.view';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.myPrefrence) || {};
};

class MyPrefrenceContainer extends PureComponent {
  render() {
    const { labels } = this.props;
    const myPrefrenceLabels = getMyPrefrenceLabels(labels);
    return <MyPrefrence labels={myPrefrenceLabels} />;
  }
}

MyPrefrenceContainer.propTypes = {
  labels: PropTypes.shape({}),
};

MyPrefrenceContainer.defaultProps = {
  labels: {},
};

export default connect()(MyPrefrenceContainer);
