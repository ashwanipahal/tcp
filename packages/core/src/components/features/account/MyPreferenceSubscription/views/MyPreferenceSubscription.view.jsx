import React from 'react';
import PropTypes from 'prop-types';
import MyPref from '../organism/MyPreferencesSection.view';

const MyPrefrence = ({ labels, ...otherProps }) => {
  return (
    <div>
      <MyPref labels={labels} {...otherProps} />
    </div>
  );
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
};

MyPrefrence.defaultProps = {
  labels: {},
};

export default MyPrefrence;
