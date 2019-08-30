import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { BirthdayCard } from '../../../molecule/BirthdayCard/views/BirthdayCard.view';

export const BirthdaySavingsList = ({ labels, childrenBirthdays }) => {
  if (childrenBirthdays && childrenBirthdays.size > 0) {
    return (
      <Row>
        {childrenBirthdays.map(birthday => (
          <Col
            colSize={{
              small: 3,
              medium: 4,
              large: 3,
            }}
          >
            <BirthdayCard {...birthday} />
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
};

export default BirthdaySavingsList;
