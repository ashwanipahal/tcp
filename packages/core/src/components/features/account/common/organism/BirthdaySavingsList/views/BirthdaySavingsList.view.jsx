import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import BirthdayCardComponent from '../../../molecule/BirthdayCard';
import EmptyBirthdayCard from '../../../molecule/EmptyBirthdayCard';

export const BirthdaySavingsList = ({ labels, childrenBirthdays, view }) => {
  if (childrenBirthdays && childrenBirthdays.size > 0) {
    const birthdays = childrenBirthdays.setSize(4);
    return (
      <Row fullBleed>
        {birthdays.map((birthday, i) => (
          <Col
            colSize={{
              small: 3,
              medium: 4,
              large: (view === 'edit' ? 3 : 6),
            }}
            ignoreGutter={{
              large: i === 1
            }}
            className="elem-mb-LRG"
          >
            {
            birthday ? (
              <BirthdayCardComponent
                name={birthday.get('name')}
                birthYear={birthday.get('birthYear')}
                birthMonth={birthday.get('birthMonth')}
                gender={birthday.get('gender')}
                childId={birthday.get('childId')}
                view={view}
              />
              ) : <EmptyBirthdayCard labels={labels} view={view} />
            }

          </Col>
        ))}
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
  view: PropTypes.oneOf(['read', 'edit']),
};

BirthdaySavingsList.defaultProps = {
  view: 'edit',
};


export default BirthdaySavingsList;
