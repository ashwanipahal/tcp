import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from './views/AddedToBagActions';

const AddedToBagContainer = props => {
  const { labels } = props;

  const onClickViewBag = () => {
    Router.push('/cart');
  };
  return <AddedToBagActionsView onClickViewBag={onClickViewBag} labels={labels} />;
};

AddedToBagContainer.propTypes = {
  // loginInfo: PropTypes.shape.isRequired,
  labels: PropTypes.shape.isRequired,
};

const mapStateToDispatch = (state, ownProps) => {
  return {
    componentProps: ownProps,
  };
};

export default connect(mapStateToDispatch)(AddedToBagContainer);
