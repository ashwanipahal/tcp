import React from 'react';
import PropTypes from 'prop-types';

import { fromJS } from 'immutable';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import BirthdaySavingsList from '../../../../common/organism/BirthdaySavingsList';
import internalEndPoints from '../../../../common/internalEndpoints';
import { getLabelValue } from '../../../../../../../utils';

const BirthdaySaving = ({ labels, childrenBirthdays }) => {
  const ctaTitle = getLabelValue(
    labels,
    childrenBirthdays && childrenBirthdays.size > 0
      ? 'lbl_profile_edit_birthday_info'
      : 'lbl_profile_add_birthday_info'
  );
  return (
    <MyProfileTile
      title={getLabelValue(labels, 'lbl_profile_birthday_savings')}
      ctaTitle={ctaTitle}
      dataLocator="birthdaySaving"
      ctaPath={internalEndPoints.birthdaySavingsPage.path}
      ctaLink={internalEndPoints.birthdaySavingsPage.link}
    >
      <BodyCopy component="div">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <BirthdaySavingsList view="read" labels={labels} />
          </Col>
        </Row>
      </BodyCopy>
    </MyProfileTile>
  );
};

BirthdaySaving.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_savings: PropTypes.string,
    lbl_profile_add_birthday_info: PropTypes.string,
    lbl_profile_birthday_saving_info: PropTypes.string,
  }),
  childrenBirthdays: PropTypes.shape({}),
};

BirthdaySaving.defaultProps = {
  labels: {
    lbl_profile_birthday_savings: '',
    lbl_profile_add_birthday_info: '',
    lbl_profile_birthday_saving_info: '',
  },
  childrenBirthdays: fromJS([]),
};

export default BirthdaySaving;
