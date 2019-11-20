import Spinner from '@tcp/core/src/components/common/atoms/Spinner';
import { Modal } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import SpinnerWrapper from '../Loader.style.native';

const Loader = props => {
  const { loaderState } = props;
  if (loaderState) {
    return (
      <Modal transparent visible>
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      </Modal>
    );
  }
  return null;
};
Loader.propTypes = {
  loaderState: PropTypes.bool,
};

Loader.defaultProps = {
  loaderState: false,
};

export default Loader;
export { Loader as LoaderVanilla };
