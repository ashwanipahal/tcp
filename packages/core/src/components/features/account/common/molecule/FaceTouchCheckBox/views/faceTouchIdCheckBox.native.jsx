import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Field } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';

const CreateAccountCheckBox = props => {
  const { labels, getTouchStatus } = props;
  return (
    <Fragment>
      {(getTouchStatus === 'TouchID' || getTouchStatus === true) && (
        <Field
          name="useTouchID"
          component={InputCheckbox}
          dataLocator="useTouchID"
          disabled={false}
          marginTop={13}
          rightText={getLabelValue(labels, 'lbl_createAccount_useTouchId', 'registration')}
        />
      )}

      {getTouchStatus === 'FaceID' && (
        <Field
          name="useFaceID"
          component={InputCheckbox}
          dataLocator="useFaceID"
          disabled={false}
          rightText={getLabelValue(labels, 'lbl_createAccount_useFaceId', 'registration')}
          marginTop={13}
        />
      )}
    </Fragment>
  );
};

CreateAccountCheckBox.propTypes = {
  getTouchStatus: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    description: PropTypes.string,
  }),
};

CreateAccountCheckBox.defaultProps = {
  labels: {
    heading: 'Welcome Back',
    subHeading: 'Log in to earn points for MY PLACE REWARDS ',
    description: `Signed up in store?\nAn online account has been created with your email! Click here to reset your password.`,
  },
};

export default CreateAccountCheckBox;
