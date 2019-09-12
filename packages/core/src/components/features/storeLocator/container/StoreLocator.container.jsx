import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { getSetSuggestedStores } from './StoreLocator.actions';
import StoreView from '../views/Store.view';

export class StoreLocator extends PureComponent {

  render() {
    // const { fetchSetSuggestedStores, country } = this.props;
    return (
      <StoreView {...this.props} />
    )
  }

};

StoreLocator.propTypes = {

};

const mapDispatchToProps = dispatch => {
  return {
    fetchSetSuggestedStores: () => dispatch(getSetSuggestedStores()),
  };
};

const mapStateToProps = state => ({
  selectedCountry: 'US', // @TODO
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoreLocator)
);
