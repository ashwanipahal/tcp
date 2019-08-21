import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as reduxFormPropTypes } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import ContactFormFields from '../../ContactFormFields';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/style';

class PickupMainContactEditForm extends React.PureComponent {
  static defaultValidation = getStandardConfig([
    'firstName',
    'lastName',
    'emailAddress',
    'phoneNumber',
  ]);

  constructor(props) {
    super(props);
    const { onEditModeChange, reset } = this.props;
    this.handleEnterEditModeClick = () => onEditModeChange(true);
    this.handleExitEditModeClick = () => {
      reset();
      onEditModeChange(false);
    };
  }

  render() {
    const { className, isMobile, initialValues, isEditing } = this.props;
    return (
      <div className={className}>
        {!isEditing && <PickUpContactDisplay contactDetails={initialValues} />}
        {isEditing && !isMobile && (
          <ContactFormFields className="pick-up-input toggle" showPhoneNumber />
        )}
      </div>
    );
  }
}

PickupMainContactEditForm.propTypes = {
  className: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.func.isRequired,
  ...reduxFormPropTypes,
};

export default withStyles(PickupMainContactEditForm, styles);
