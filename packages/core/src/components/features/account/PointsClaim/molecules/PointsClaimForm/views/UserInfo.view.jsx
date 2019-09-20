import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

export const UserInfo = ({ className, labels, myPlaceNumber, userInfoData }) => {
  return (
    <BodyCopy className={className}>
      <Row fullBleed className="elem-mb-SM">
        <Col colSize={{ small: 2, medium: 4, large: 5 }} ignoreGutter={{ small: true }}>
          <BodyCopy
            dataLocator="profileinfo-rewardsid_lbl"
            fontFamily="secondary"
            fontSize="fs16"
            component="span"
            fontWeight="extrabold"
          >
            {getLabelValue(labels, 'lbl_points_claim_account_number', 'myPlaceRewards')}
          </BodyCopy>
        </Col>
        <Col colSize={{ small: 4, medium: 4, large: 3 }}>
          <BodyCopy
            dataLocator="profileinfo-rewardsid_value"
            fontFamily="secondary"
            fontSize="fs14"
            component="span"
          >
            {myPlaceNumber}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-SM">
        <Col colSize={{ small: 2, medium: 4, large: 5 }} ignoreGutter={{ small: true }}>
          <BodyCopy
            dataLocator="profileinfo-firstname_lbl"
            fontFamily="secondary"
            fontSize="fs16"
            component="span"
            fontWeight="extrabold"
          >
            {getLabelValue(labels, 'lbl_points_claim_firstname', 'myPlaceRewards')}
          </BodyCopy>
        </Col>
        <Col colSize={{ small: 4, medium: 4, large: 5 }}>
          <BodyCopy
            dataLocator="profileinfo-firstname_value"
            fontFamily="secondary"
            fontSize="fs14"
            component="span"
          >
            {userInfoData.firstName}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-SM">
        <Col colSize={{ small: 2, medium: 4, large: 5 }} ignoreGutter={{ small: true }}>
          <BodyCopy
            dataLocator="profileinfo-lastname_lbl"
            fontFamily="secondary"
            fontSize="fs16"
            component="span"
            fontWeight="extrabold"
          >
            {getLabelValue(labels, 'lbl_points_claim_lastname', 'myPlaceRewards')}
          </BodyCopy>
        </Col>
        <Col colSize={{ small: 4, medium: 4, large: 5 }}>
          <BodyCopy
            dataLocator="profileinfo-lastname_value"
            fontFamily="secondary"
            fontSize="fs14"
            component="span"
          >
            {userInfoData.lastName}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-XXL">
        <Col colSize={{ small: 2, medium: 4, large: 5 }} ignoreGutter={{ small: true }}>
          <BodyCopy
            dataLocator="profileinfo-email_lbl"
            fontFamily="secondary"
            fontSize="fs16"
            component="span"
            fontWeight="extrabold"
          >
            {getLabelValue(labels, 'lbl_points_claim_email', 'myPlaceRewards')}
          </BodyCopy>
        </Col>
        <Col colSize={{ small: 4, medium: 4, large: 3 }}>
          <BodyCopy
            dataLocator="profileinfo-email_value"
            fontFamily="secondary"
            fontSize="fs14"
            component="span"
          >
            {userInfoData.emailAddress}
          </BodyCopy>
        </Col>
      </Row>
    </BodyCopy>
  );
};

UserInfo.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  myPlaceNumber: PropTypes.string,
  userInfoData: PropTypes.shape({}),
};

UserInfo.defaultProps = {
  className: '',
  myPlaceNumber: '',
  userInfoData: {},
};

export default UserInfo;
