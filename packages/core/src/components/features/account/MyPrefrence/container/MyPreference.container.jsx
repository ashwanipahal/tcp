import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPrefrence from '../views';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.preferences) || {};
};

export class MyPrefrenceContainer extends PureComponent {
  render() {
    const { labels, handleComponentChange, activeComponent } = this.props;
    const myPrefrenceLabels = getMyPrefrenceLabels(labels);
    return (
      <MyPrefrence
        labels={myPrefrenceLabels}
        handleComponentChange={handleComponentChange}
        activeComponent={activeComponent}
      />
    );
  }
}

MyPrefrenceContainer.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  activeComponent: PropTypes.string,
};

MyPrefrenceContainer.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  activeComponent: '',
};

export default connect()(MyPrefrenceContainer);
