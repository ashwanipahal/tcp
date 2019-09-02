import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath, calculateAge } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Image from '@tcp/core/src/components/common/atoms/Image';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import constants from '../../../organism/BirthdaySavingsList/BirthdaySavingsList.constants';
import styles from '../styles/BirthdayCard.style';

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
          onClick={() => removeBirthday(childId)}
          className="closeIcon"
        />
      )}
      <BodyCopy
        textAlign="center"
        fontWeight="semibold"
        className="elem-mb-XXXS"
        fontFamily="secondary"
      >
        {name}
      </BodyCopy>
      <div className="cardInfo">
        <BodyCopy fontFamily="secondary" fontWeight="semibold" fontSize="fs12">
          {age}
        </BodyCopy>
        <Image
          alt="userIcon"
          className="genderIcon"
          src={getIconPath(gender === constants.CHILD_GENDER_MAP.FEMALE ? 'girl-icon' : 'boy-icon')}
        />
        <BodyCopy fontFamily="secondary" fontSize="fs12" fontWeight="semibold" textAlign="right">
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
