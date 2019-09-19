import React from 'react';
import PropTypes from 'prop-types';
import { calculateAge } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';
import { BirthdayCardContainer, CardInfo, NameWrapper } from '../styles/BirthdayCard.style.native';
import boyIcon from '../../../../../../../../../mobileapp/src/assets/images/boy-icon.png';
import girlIcon from '../../../../../../../../../mobileapp/src/assets/images/child-birthday-profile.png';

/**
 * This component will render the BirthdayCard based on the view and birthday information
 * @param {object} props
 * @param { string } props.name Name of the children
 * @param { string } props.birthYear year of birth
 * @param { string } props.birthMonth month of birth
 * @param { string } props.gender gender of the children
 */
export const BirthdayCard = ({ name, birthYear, birthMonth, gender }) => {
  const age = calculateAge(birthMonth, birthYear);
  return (
    <BirthdayCardContainer>
      <NameWrapper>
        <BodyCopy
          textAlign="center"
          fontWeight="semibold"
          className="elem-mb-XXXS"
          mobileFontFamily="secondary"
          data-locator="nameOfChildInTile"
          text={name}
        />
      </NameWrapper>

      <CardInfo>
        <BodyCopy
          mobileFontFamily="secondary"
          fontWeight="semibold"
          fontSize="fs12"
          data-locator="childAgeInTile"
          text={age}
        />

        <ImageComp
          source={gender === constants.CHILD_GENDER_MAP.FEMALE ? girlIcon : boyIcon}
          width={16}
          height={24}
        />

        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs12"
          fontWeight="semibold"
          textAlign="right"
          data-locator="childBirthYearInTile"
          text={birthYear}
        />
      </CardInfo>
    </BirthdayCardContainer>
  );
};

BirthdayCard.propTypes = {
  name: PropTypes.string.isRequired,
  birthYear: PropTypes.string.isRequired,
  birthMonth: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default BirthdayCard;
