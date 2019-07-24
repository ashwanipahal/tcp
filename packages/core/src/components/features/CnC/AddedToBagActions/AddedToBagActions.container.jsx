import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from './views/AddedToBagActions';

const AddedToBagContainer = props => {
  const { isLoggedIn, labels } = props;

  const onClickCheckout = () => {
    if (!isLoggedIn) {
      Router.push('/login');
    } else {
      Router.push('/shipping');
    }
  };
  return <AddedToBagActionsView labels={labels} onClickCartCheckout={onClickCheckout} />;
};

AddedToBagContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  labels: PropTypes.shape.isRequired,
};

const mapStateToDispatch = (...params) => {
  const ownProps = params[1];
  return {
    isLoggedIn: true,
    componentProps: ownProps,
  };
};

export default connect(mapStateToDispatch)(AddedToBagContainer);
