import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { ErrorView, ErrorText } from '../styles/ItemAvailability.style.native';

class ItemAvailability extends React.PureComponent {
  render() {
    const { error } = this.props;
    return (
      <>
        {!!error && (
          <ErrorView>
            <BodyCopy
              color="error"
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="regular"
              text={error}
              style={ErrorText}
            />
          </ErrorView>
        )}
      </>
    );
  }
}

ItemAvailability.propTypes = {
  error: PropTypes.string,
};

ItemAvailability.defaultProps = {
  error: '',
};

export default ItemAvailability;

export { ItemAvailability as ItemAvailabilityVanilla };
