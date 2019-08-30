import React from 'react';
import PropTypes from 'prop-types';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import BirthdaySavingsList from '../../common/organism/BirthdaySavingsList';

export const BirthdaySavings = ({ labels }) => {
  return (
    <>
      <FormPageHeading heading={labels.lbl_birthdaySavingsPageHeading} />
      <BirthdaySavingsList view="edit" />
    </>
  );
};

BirthdaySavings.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default BirthdaySavings;
