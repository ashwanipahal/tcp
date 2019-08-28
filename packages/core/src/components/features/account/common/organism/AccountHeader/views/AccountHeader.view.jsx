import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import RewardsPoints from '../../RewardsPoints';
import RewardsPointsBanner from '../molecule/RewardsPointsBanner';
import { isCanada } from '../../../../../../../utils';

export const AccountHeader = ({
  labels,
  commonLabels,
  name,
  pointsToNextRewards,
  currentPoints,
  totalRewards,
  rewardsPointsBannerContent,
}) => {
  const isCA = isCanada();

  if (!name) {
    return null;
  }

  return (
    <Row fullBleed>
      <Col
        colSize={{
          small: 0,
          medium: 0,
          large: 2,
        }}
        isNotInlineBlock
        className="hide-on-mobile hide-on-tablet"
      >
        <BodyCopy fontSize="fs20" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
          {`${labels.lbl_overview_greeting} ${name || ''}`}
        </BodyCopy>
      </Col>
      {!isCA && (
        <>
          <Col
            colSize={{
              small: 0,
              medium: 5,
              large: 5,
            }}
            isNotInlineBlock
            className="hide-on-mobile"
          >
            {rewardsPointsBannerContent && (
              <RewardsPointsBanner content={rewardsPointsBannerContent} />
            )}
          </Col>
          <Col
            colSize={{
              small: 6,
              medium: 3,
              large: 5,
            }}
            isNotInlineBlock
          >
            <RewardsPoints
              tableView
              labels={commonLabels}
              pointsToNextRewards={pointsToNextRewards}
              currentPoints={currentPoints}
              totalRewards={totalRewards}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

AccountHeader.propTypes = {
  name: PropTypes.string,
  pointsToNextRewards: PropTypes.string,
  currentPoints: PropTypes.string,
  totalRewards: PropTypes.string,
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
  rewardsPointsBannerContent: PropTypes.node,
};

AccountHeader.defaultProps = {
  name: '',
  pointsToNextRewards: '',
  currentPoints: '',
  totalRewards: '',
  labels: {},
  commonLabels: {},
  rewardsPointsBannerContent: '',
};

export default AccountHeader;
