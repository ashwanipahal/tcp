import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { calculateAge } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';
import {
  BirthdayCardContainer,
  CardInfo,
  NameWrapper,
  CloseIcon,
} from '../styles/BirthdayCard.style.native';
import boyIcon from '../../../../../../../../../mobileapp/src/assets/images/boy-icon.png';
import girlIcon from '../../../../../../../../../mobileapp/src/assets/images/child-birthday-profile.png';
import closeIcon from '../../../../../../../../../mobileapp/src/assets/images/close.png';

/**
 * This component will render the BirthdayCard based on the view and birthday information
 * @param {object} props
 * @param { string } props.name Name of the children
 * @param { string } props.birthYear year of birth
 * @param { string } props.birthMonth month of birth
 * @param { string } props.gender gender of the children
 * @param { string } props.childId unique Id of the children
 * @param { Function } props.removeBirthday will handle removal of Birthday Card
 * @param { string } props.view view of the BirthdayCard, in read mode, remove action wont be available.
 */
export const BirthdayCard = ({
  name,
  birthYear,
  birthMonth,
  gender,
  view,
  childId,
  removeBirthday,
}) => {
  const isEditMode = view === constants.VIEW.EDIT;
  const age = calculateAge(birthMonth, birthYear);
  return (
    <BirthdayCardContainer>
      {isEditMode && (
        <CloseIcon>
          <TouchableOpacity
            onPress={() =>
              removeBirthday({
                childId,
                childName: name,
                birthYear,
                birthMonth,
                gender,
              })
            }
            accessibilityLabel="Delete child"
            accessibilityRole="button"
          >
            <ImageComp source={closeIcon} width={14} height={14} />
          </TouchableOpacity>
        </CloseIcon>
      )}
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
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
  childId: PropTypes.string.isRequired,
  removeBirthday: PropTypes.func.isRequired,
};

BirthdayCard.defaultProps = {
  view: constants.VIEW.EDIT,
};

export default BirthdayCard;
