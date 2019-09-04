import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';
import constants from '../BirthdaySavingsList.constants';

/**
 * @function getColumnClasses
 * @description This function will return margin classes to be applied on the birthday columns.
 * As per the design, last row columns should have MED margin
 * @param {boolean} isEditMode If list is opened in edit view i.e. BirthdaySavings Page
 * @param {number} index index of the column
 */
export const getColumnClasses = (isEditMode, index) => {
  return !isEditMode && index < 2 ? 'elem-mb-LRG' : 'elem-mb-MED';
};

/**
 * @function BirthdaySavingsList
 * @description This component will render the BirthdaySavings Card list based on the view provided.
 * In case of view="edit", Add new Birthday Card will be rendered otherwise Empty space will be present.
 */
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
