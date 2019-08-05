import React from 'react';
import { connect } from 'react-redux';
import MiniBagView from '../views/MiniBag.view';

const MiniBag = () => {
  return <MiniBagView />;
};

export default connect(
  null,
  null
)(MiniBag);
