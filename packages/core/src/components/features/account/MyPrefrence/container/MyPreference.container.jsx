import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPrefrence from '../views';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.preferences) || {};
};

export class MyPrefrenceContainer extends PureComponent {
  render() {
    const { labels, handleComponentChange, componentProps, urlParams } = this.props;
    const myPrefrenceLabels = getMyPrefrenceLabels(labels);

    console.log('kali bhai--------------------------');
    console.log(urlParams);
    console.log('kali bhai--------------------------');

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

export const mapStateToProps = (state, ownProps) => {
  return {
    urlParams: ownProps.router.query,
  };
};

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

export default connect(mapStateToProps)(MyPrefrenceContainer);
