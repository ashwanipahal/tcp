/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { connect } from 'react-redux';
import ForgotPasswordView from '../views/ForgotPassword.view';

// @flow

export const ForgotPasswordContainer = () => {
  return <ForgotPasswordView />;
};

export default connect()(ForgotPasswordContainer);
