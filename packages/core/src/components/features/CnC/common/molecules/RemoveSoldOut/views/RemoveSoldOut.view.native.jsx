import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { RemoveSoldOutView } from '../styles/RemoveSoldOut.style.native';

class RemoveSoldOut extends React.PureComponent {
  render() {
    const { labels } = this.props;
    return (
      <RemoveSoldOutView>
        <BodyCopy
          color="error"
          fontFamily="secondary"
          fontSize="fs10"
          fontWeight="regular"
          text={labels.removeSoldOut}
        />
      </RemoveSoldOutView>
    );
  }
}

RemoveSoldOut.propTypes = {
  labels: PropTypes.string,
};

RemoveSoldOut.defaultProps = {
  labels: '',
};

export default RemoveSoldOut;

export { RemoveSoldOut as RemoveSoldOutVanilla };
