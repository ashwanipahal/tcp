import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import BirthdaySavingsList from '../../common/organism/BirthdaySavingsList';
import internalEndpoints from '../../common/internalEndpoints';

/**
 * This component will render BirthdaySavingsPage component
 * @param { object } labels
 */
export const BirthdaySavings = ({ labels }) => {
  return (
    <>
      <BodyCopy component="div" className="elem-mb-LRG">
        <Anchor
          to={internalEndpoints.profilePage.link}
          asPath={internalEndpoints.profilePage.path}
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          data-locator="backLink"
        >
          <span className="left-arrow" />
          {labels.lbl_profile_personal_info_back}
        </Anchor>
      </BodyCopy>
      <FormPageHeading
        className="elem-mb-LRG"
        heading={labels.lbl_profile_birthday_savings}
        data-locator="birthdaySavingsLbl"
      />
      <BodyCopy
        fontSize="fs14"
        fontFamily="secondary"
        className="elem-mb-XXL"
        data-locator="instrText"
      >
        {labels.lbl_profile_birthday_saving_info}
      </BodyCopy>
      <BirthdaySavingsList view="edit" labels={labels} />
    </>
  );
};

BirthdaySavings.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default BirthdaySavings;
