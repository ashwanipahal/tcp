import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CTAView from '../../../common/molecules/CTA/views/CTA';

const CTAContainer = props => {
  const { isLoggedIn } = props;

  const onClickCheckout = () => {
    if (!isLoggedIn) {
      Router.push('/login');
    } else {
      Router.push('/shipping');
    }
  };

  return <CTAView onClickCartcheckout={onClickCheckout} />;
};

CTAContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToDispatch = (...params) => {
  const ownProps = params[1];
  return {
    isLoggedIn: true,
    componentProps: ownProps,
  };
};

export default connect(mapStateToDispatch)(CTAContainer);
