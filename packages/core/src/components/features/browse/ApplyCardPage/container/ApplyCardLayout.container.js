/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { ApplyCardLayoutView } from '../views/ApplyCardLayout.View';

class ApplyCardLayoutContainer extends React.Component {
  render() {
    return <ApplyCardLayoutView />;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyCardLayoutContainer);
