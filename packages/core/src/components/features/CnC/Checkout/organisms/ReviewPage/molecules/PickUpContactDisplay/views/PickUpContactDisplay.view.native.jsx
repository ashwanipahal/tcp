import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import { Header } from '../styles/PickUpContactDisplay.style.native';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';

/**
 *DISPLAY NAME, PHONE NO, EMAIL OF PICKUP PERSON AND ALTERNATE PERSON
 *
 * @class PickUpContactDisplay
 * @extends {React.PureComponent}
 */
class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { formData } = this.props;
    return (
      <Header>
        <BodyCopy
          fontSize="fs16"
          dataLocator=""
          fontFamily="secondary"
          color="gray.900"
          fontWeight="regular"
          text={`${formData.firstName} ${formData.lastName}`}
        />
        {formData.phoneNumber && (
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            fontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
            text={formData.phoneNumber}
          />
        )}
        {formData.emailAddress && (
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            fontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
            text={formData.emailAddress}
          />
        )}
      </Header>
    );
  }
}

PickUpContactDisplay.propTypes = {
  formData: PropTypes.shape({}).isRequired,
};

export default withStyles(PickUpContactDisplay);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
