import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { MainSection, RowSectionStyle } from '../styles/ItemAvailability.style.native';

class ItemAvailability extends React.PureComponent {
  render() {
    const { errorMsg, chooseDiff } = this.props;
    return (
      <MainSection>
        <RowSectionStyle>
          <BodyCopy
            color="error"
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            text={errorMsg}
          />
        </RowSectionStyle>
        <RowSectionStyle>
          <BodyCopy
            color="error"
            fontFamily="secondary"
            fontSize="fs10"
            fontWeight="regular"
            text={chooseDiff}
          />
        </RowSectionStyle>
      </MainSection>
    );
  }
}

ItemAvailability.propTypes = {
  errorMsg: PropTypes.string,
  chooseDiff: PropTypes.string,
};

ItemAvailability.defaultProps = {
  errorMsg: '',
  chooseDiff: '',
};

export default ItemAvailability;

export { ItemAvailability as ItemAvailabilityVanilla };
