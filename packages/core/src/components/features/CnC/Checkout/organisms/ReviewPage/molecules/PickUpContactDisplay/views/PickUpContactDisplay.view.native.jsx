import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import { Header, FontStyle } from '../styles/PickUpContactDisplay.style.native';
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
        <FontStyle>
          <BodyCopy
            fontSize="fs16"
            dataLocator="pickup-section-name-inp"
            mobileFontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
            text={`${formData.firstName} ${formData.lastName}`}
          />
        </FontStyle>
        {formData.phoneNumber && (
          <FontStyle>
            <BodyCopy
              fontSize="fs16"
              dataLocator="pickup-section-phoneNumber-inp"
              mobileFontFamily="secondary"
              color="gray.900"
              fontWeight="regular"
              text={formData.phoneNumber}
            />
          </FontStyle>
        )}
        {formData.emailAddress && (
          <FontStyle>
            <BodyCopy
              fontSize="fs16"
              dataLocator="pickup-section-email-inp"
              mobileFontFamily="secondary"
              color="gray.900"
              fontWeight="regular"
              text={formData.emailAddress}
            />
          </FontStyle>
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
