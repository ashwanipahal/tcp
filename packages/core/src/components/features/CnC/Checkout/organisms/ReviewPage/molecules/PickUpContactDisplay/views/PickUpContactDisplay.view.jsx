import React from 'react';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from '../../../../../../../../../utils/formValidation/phoneNumber';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/PickUpContactDisplay.style';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';

class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { className, formData } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          fontSize="fs16"
          dataLocator=""
          fontFamily="secondary"
          color="gray.900"
          fontWeight="regular"
        >
          {`${formData.firstName} ${formData.lastName}`}
        </BodyCopy>
        {formData.phoneNumber && (
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            fontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
          >
            {formatPhoneNumber(formData.phoneNumber)}
          </BodyCopy>
        )}
        {formData.emailAddress && (
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            fontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
          >
            {formData.emailAddress}
          </BodyCopy>
        )}
      </div>
    );
  }
}

PickUpContactDisplay.propTypes = {
  className: PropTypes.string.isRequired,
  formData: PropTypes.shape({}).isRequired,
};

export default withStyles(PickUpContactDisplay, styles);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
