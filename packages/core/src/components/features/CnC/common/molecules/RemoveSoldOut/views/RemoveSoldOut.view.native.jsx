import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { RemoveSoldOutView, RowSectionStyle } from '../styles/RemoveSoldOut.style.native';

class RemoveSoldOut extends React.PureComponent {
  render() {
    const { labels, labelForRemove } = this.props;
    return (
      <RemoveSoldOutView>
        {labels && (
          <RowSectionStyle>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="regular"
              text={labels.removeSoldoutHeader}
            />
          </RowSectionStyle>
        )}
        {labelForRemove && (
          <RowSectionStyle>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="regular"
              text={labelForRemove}
            />
          </RowSectionStyle>
        )}
      </RemoveSoldOutView>
    );
  }
}

RemoveSoldOut.propTypes = {
  labels: PropTypes.string,
  labelForRemove: PropTypes.string,
};

RemoveSoldOut.defaultProps = {
  labels: '',
  labelForRemove: '',
};

export default RemoveSoldOut;

export { RemoveSoldOut as RemoveSoldOutVanilla };
