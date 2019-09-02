import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';
import constants from '../BirthdaySavingsList.constants';

export const getColumnClasses = (isEditMode, i) => {
  return !isEditMode && i < 2 ? 'elem-mb-LRG' : 'elem-mb-MED';
};

export const BirthdaySavingsList = ({ labels, childrenBirthdays, view }) => {
  if (childrenBirthdays && childrenBirthdays.size > 0) {
    const birthdays = childrenBirthdays.setSize(constants.MAX_BIRTHDAY_CARDS);
    const isEditMode = view === 'edit';
    return (
      <Row fullBleed>
        {birthdays.map((birthday, i) => {
          const isRightCol = (i + 1) % 2;
          return (
            <Col
              key={`card_${birthday ? birthday.childId : i}`}
              colSize={{
                small: 3,
                medium: 4,
                large: isEditMode ? 3 : 6,
              }}
              ignoreGutter={{
                large: isEditMode ? (i + 1) % 4 === 0 : isRightCol,
                medium: isRightCol,
                small: isRightCol,
              }}
              className={getColumnClasses()}
            >
              {birthday ? (
                <BirthdayCardComponent
                  name={birthday.get('name')}
                  birthYear={birthday.get('birthYear')}
                  birthMonth={birthday.get('birthMonth')}
                  gender={birthday.get('gender')}
                  childId={birthday.get('childId')}
                  view={view}
                />
              ) : (
                <EmptyBirthdayCard labels={labels} view={view} />
              )}
            </Col>
          );
        })}
      </Row>
    );
  }
  return (
    <BodyCopy fontSize="fs14" fontFamily="secondary">
      {labels.lbl_profile_birthday_saving_info}
    </BodyCopy>
  );
};

BirthdaySavingsList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  childrenBirthdays: PropTypes.shape([]).isRequired,
  view: PropTypes.oneOf([constants.VIEW.READ, constants.VIEW.EDIT]),
};

BirthdaySavingsList.defaultProps = {
  view: constants.VIEW.EDIT,
};

export default BirthdaySavingsList;
