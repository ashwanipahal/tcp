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
          color="gray.900"
          text={`${formData.firstName} ${formData.lastName}`}
        />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          color="gray.900"
          text={formData.phoneNumber}
        />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          color="gray.900"
          text={formData.emailAddress}
        />
      </View>
    );
  }
}

PickUpContactDisplay.propTypes = {
  formData: PropTypes.shape({}).isRequired,
};

export default withStyles(PickUpContactDisplay, Style);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
