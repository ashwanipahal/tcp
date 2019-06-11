import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalCloseIcon from './ModalCloseIcon';
import ModalTitle from './ModalTitle';

const ModalHeader = ({ closeFunc, title }) => (
  <Fragment>
    <ModalCloseIcon closeFunc={closeFunc} />
    <ModalTitle title={title} />
  </Fragment>
);

ModalHeader.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalHeader;
