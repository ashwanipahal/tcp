import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Style from '../styles/PickUpContactDisplay.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { formData } = this.props;
    return (
      <View>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="regular"
          text={`${formData.pickUpContact.firstName} ${formData.pickUpContact.lastName}`}
        />
        {formData.pickUpContact.phoneNumber && (
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            text={formData.pickUpContact.phoneNumber}
          />
        )}
        {formData.pickUpContact.emailAddress && (
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            text={formData.pickUpContact.emailAddress}
          />
        )}
      </View>
    );
  }
}

PickUpContactDisplay.propTypes = {
  formData: PropTypes.shape({}).isRequired,
};

export default withStyles(PickUpContactDisplay, Style);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
