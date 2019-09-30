import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath, calculateAge } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Image from '@tcp/core/src/components/common/atoms/Image';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';
import styles from '../styles/BirthdayCard.style';

/**
 * This component will render the BirthdayCard based on the view and birthday information
 * @param {object} props
 * @param { string } props.className
 * @param { string } props.name Name of the children
 * @param { string } props.birthYear year of birth
 * @param { string } props.birthMonth month of birth
 * @param { string } props.gender gender of the children
 * @param { string } props.childId unique Id of the children
 * @param { Function } props.removeBirthday will handle removal of Birthday Card
 * @param { string } props.view view of the BirthdayCard, in read mode, remove action wont be available.
 */
export const BirthdayCard = ({
  className,
  name,
  birthYear,
  birthMonth,
  gender,
  childId,
  removeBirthday,
  view,
}) => {
  const isEditMode = view === constants.VIEW.EDIT;
  const age = calculateAge(birthMonth, birthYear);
  return (
    <div className={className}>
      {isEditMode && (
        <Image
          alt="closeIcon"
          src={getIconPath('close-icon')}
          onClick={() =>
            removeBirthday({
              childId,
              childName: name,
              birthYear,
              birthMonth,
              gender,
            })
          }
          className="closeIcon"
          data-locator="crossIconInTile"
        />
      )}
      <BodyCopy
        textAlign="center"
        fontWeight="semibold"
        className={
          isEditMode
            ? 'elem-mb-XXXS text-ellipsis layout-pr-XS layout-pl-XS'
            : 'elem-mb-XXXS text-ellipsis'
        }
        fontFamily="secondary"
        title={name}
        data-locator="nameOfChildInTile"
      >
        {name}
      </BodyCopy>
      <div className="cardInfo">
        <BodyCopy
          fontFamily="secondary"
          fontWeight="semibold"
          fontSize="fs12"
          data-locator="childAgeInTile"
        >
          {age}
        </BodyCopy>
        <Image
          alt="userIcon"
          className="genderIcon"
          src={getIconPath(gender === constants.CHILD_GENDER_MAP.FEMALE ? 'girl-icon' : 'boy-icon')}
          data-locator="childImg"
        />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs12"
          fontWeight="semibold"
          textAlign="right"
          data-locator="childBirthYearInTile"
        >
          {birthYear}
        </BodyCopy>
      </div>
    </div>
  );
};

BirthdayCard.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthYear: PropTypes.string.isRequired,
  birthMonth: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  childId: PropTypes.string.isRequired,
  removeBirthday: PropTypes.func.isRequired,
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
};

BirthdayCard.defaultProps = {
  view: constants.VIEW.EDIT,
};

export default withStyles(BirthdayCard, styles);
