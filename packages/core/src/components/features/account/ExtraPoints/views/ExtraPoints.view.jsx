import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import PromoListTile from '@tcp/core/src/components/common/molecules/PromoListTile/views';
import { isCanada } from '@tcp/core/src/utils';
import styles from '../styles/ExtraPoints.style';
import externalEndpoints from '../../common/externalEndpoints';
import internalEndpoints from '../../common/internalEndpoints';

import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import DetailedEarnExtraPointsTile from '../../common/molecule/DetailedEarnExtraPointsTile';
import DetailedEarnExtraPointsSingleTileComponent from '../../common/molecule/DetailedEarnExtraPointsTile/views/DetailedEarnExtraPointsSingleTile.view';
import ExtraPointsSkeleton from '../skeleton/ExtraPointsSkeleton.view';
import PromoBannerSkeleton from '../skeleton/PromoBannerSkeleton.view';
/**
 * This function getNotificationMarkup use for return the notification message
 * can be passed in the component.
 * @param earnedPointsNotification - earnedPointsNotification object used for showing extra date and points details
 */

const getNotificationMarkup = (earnedPointsNotification, infoMessage, earnExtraPointsLabels) => {
  return earnedPointsNotification && earnedPointsNotification.length ? (
    <Notification
      status="info"
      className="elem-mt-MED notification-wrapper"
      alt={getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_imageAlt')}
    >
      <BodyCopy
        component="span"
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
        className="elem-mr-LRG notification-text"
        dataLocator="earnextrapoints-notificationdate"
      >
        {earnedPointsNotification[0].transactionDate}
      </BodyCopy>
      <BodyCopy
        component="span"
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
        dataLocator="earnextrapoints-notificationtext"
        className="notification-text"
      >
        {infoMessage}
      </BodyCopy>
      <Anchor
        fontSizeVariation="large"
        underline
        asPath={internalEndpoints.pointsHistoryPage.path}
        to={internalEndpoints.pointsHistoryPage.link}
        anchorVariation="primary"
        dataLocator="view-points-history"
        className="notification-text-link"
      >
        {getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_view_points_history')}
      </Anchor>
    </Notification>
  ) : (
    ''
  );
};

/**
 * @function return  Used to render the promolist tiles
 * @param    {[Object]}  promoListData tile data from graphQL
 * @return   {[Object]} JSX of the component
 */
const getPromoTileData = (promoListData, isPromoListFetching, openPLCCModal) => {
  if (isPromoListFetching) {
    return <PromoBannerSkeleton />;
  }
  return promoListData ? (
    <Row fullBleed>
      {promoListData.map((item, index) => {
        return (
          <>
            {item && (index === 0 || index === 2) && (
              <Col colSize={{ small: 3, medium: 2, large: 3 }} className="borderAll">
                <PromoListTile
                  openPLCCModal={openPLCCModal}
                  key={index.toString()}
                  tileData={item}
                />
                <BodyCopy component="div" className="tile-border" />
              </Col>
            )}
            {item && index === 1 && (
              <Col colSize={{ small: 3, medium: 2, large: 3 }} className="borderAll">
                <PromoListTile
                  openPLCCModal={openPLCCModal}
                  key={index.toString()}
                  tileData={item}
                />
                <BodyCopy component="div" className="tile-border-desktop" />
              </Col>
            )}
            {item && index === 3 && (
              <Col colSize={{ small: 3, medium: 2, large: 3 }}>
                <PromoListTile
                  openPLCCModal={openPLCCModal}
                  key={index.toString()}
                  tileData={item}
                />
              </Col>
            )}
          </>
        );
      })}
    </Row>
  ) : (
    ''
  );
};

/**
 * @function return  Used to render the promolist tiles
 * @param    {[Object]}  waysToEarn tile data from graphQL
 * @param    {[Object]}  onViewActivityDetails activity data
 * @param    {[Object]}  fistRowItem tile data from first row
 * @param    {[Object]}  secondRowItem tile data from second row
 * @param    {[Object]}  labels tile data from graphQL
 * @param    {[Boolean]}  isEarnExtraPointsFetching fetching state
 * @return   {[Object]} JSX of the component
 */
const getEarnExtraPointTile = (
  waysToEarn,
  onViewActivityDetails,
  fistRowItem,
  secondRowItem,
  labels,
  isEarnExtraPointsFetching
) => {
  if (isEarnExtraPointsFetching) {
    return <ExtraPointsSkeleton />;
  }
  return (
    waysToEarn &&
    waysToEarn.length && (
      <>
        <BodyCopy
          fontSize="fs18"
          fontWeight="semibold"
          textAlign="center"
          fontFamily="secondary"
          className="morePointsWrapper"
          data-locator="earnextrapoints-morePointsText"
        >
          {getLabelValue(labels, 'lbl_extraExtraPoints_more_points')}
        </BodyCopy>
        <Row fullBleed className="elem-mt-LRG">
          {fistRowItem &&
            fistRowItem.map((item, index) => {
              return (
                <>
                  {item && index === 0 && (
                    <Col colSize={{ small: 6, medium: 4, large: 6 }}>
                      <DetailedEarnExtraPointsSingleTileComponent
                        key={index.toString()}
                        waysToEarnRow={item}
                        onViewActivityDetails={onViewActivityDetails}
                        labels={labels}
                        viewAll
                      />
                    </Col>
                  )}
                  {item && index > 0 && (
                    <Col
                      colSize={{ small: 3, medium: 2, large: 3 }}
                      className={`${index === 1 ? 'extraPointsTileCol' : ''}`}
                    >
                      <DetailedEarnExtraPointsTile
                        key={index.toString()}
                        waysToEarnRow={item}
                        onViewActivityDetails={onViewActivityDetails}
                        labels={labels}
                        viewAll
                      />
                    </Col>
                  )}
                </>
              );
            })}
        </Row>
        <Row fullBleed>
          {secondRowItem &&
            secondRowItem.map((item, index) => {
              let ignoreGutter = '';
              if ((index + 1) % 4 === 0) {
                ignoreGutter = { large: true, medium: true, small: true };
              }
              return (
                <Col colSize={{ small: 3, medium: 2, large: 3 }} ignoreGutter={ignoreGutter}>
                  <DetailedEarnExtraPointsTile
                    key={index.toString()}
                    waysToEarnRow={item}
                    onViewActivityDetails={onViewActivityDetails}
                    labels={labels}
                    viewAll
                  />
                </Col>
              );
            })}
        </Row>
      </>
    )
  );
};
/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const EarnPoints = ({
  className,
  labels,
  earnExtraPointsLabels,
  waysToEarn,
  earnedPointsNotification,
  onViewActivityDetails,
  promoListData,
  isEarnExtraPointsFetching,
  isPromoListFetching,
  openPLCCModal,
  openModal,
}) => {
  let fistRowItem = [];
  let secondRowItem = [];
  let infoMessage = '';
  if (waysToEarn && waysToEarn.length) {
    fistRowItem = waysToEarn.slice(0, 3);
    secondRowItem = waysToEarn.slice(3);
  }

  if (earnedPointsNotification && earnedPointsNotification.length) {
    infoMessage = `${getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_you_earned')} ${
      earnedPointsNotification[0].pointsEarned
    } ${getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_place_rewards')} `;
  }

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <div className={className}>
      {!isCanada() && (
        <>
          <FormPageHeadingComponent
            heading={getLabelValue(labels, 'lbl_common_extraPointsHeading')}
            className="myAccountRightView"
          />
          {getNotificationMarkup(earnedPointsNotification, infoMessage, earnExtraPointsLabels)}
          <div className="extraEarningWrapper">
            <BodyCopy
              fontSize="fs28"
              fontWeight="black"
              textAlign="center"
              fontFamily="primary"
              className="earningExtra"
              data-locator="earnextrapoints-youAreEarning"
            >
              {getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_youAreEarning')}
            </BodyCopy>

            <BodyCopy
              fontSize="fs18"
              fontWeight="regular"
              textAlign="center"
              fontFamily="secondary"
              className="checkOffers"
              data-locator="earnextrapoints-morePointsText"
            >
              {getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_checkOffers')}
            </BodyCopy>
            <BodyCopy textAlign="center" className="learnMore">
              <Anchor
                onClick={openModal}
                fontSizeVariation="xlarge"
                underline
                noLink
                textAlign="center"
                href="#"
                anchorVariation="primary"
                dataLocator="shipping internationally"
                target="_self"
              >
                {getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_learnMore')}
              </Anchor>
            </BodyCopy>
          </div>
          {getPromoTileData(promoListData, isPromoListFetching, openPLCCModal)}
          {getEarnExtraPointTile(
            waysToEarn,
            onViewActivityDetails,
            fistRowItem,
            secondRowItem,
            labels,
            isEarnExtraPointsFetching
          )}
          <BodyCopy
            fontSize="fs14"
            fontWeight="regular"
            fontFamily="secondary"
            className="elem-mt-XL"
          >
            <Anchor
              noUnderline
              anchorVariation="primary"
              fontSizeVariation="large"
              underline
              noLink
              href={externalEndpoints.mprTermsPage}
              target="_blank"
              dataLocator="shipping-email-signUp-contact-anchor"
            >
              {getLabelValue(labels, 'lbl_common_check_here')}
            </Anchor>
            {getLabelValue(labels, 'lbl_common_extra_points_terms_conditions')}
          </BodyCopy>
        </>
      )}
    </div>
  );
};
EarnPoints.propTypes = {
  className: PropTypes.string,
  onViewActivityDetails: PropTypes.func.isRequired,
  waysToEarn: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
  earnedPointsNotification: PropTypes.shape([]),
  earnExtraPointsLabels: PropTypes.shape({
    lbl_earnExtraPoints_you_earned: PropTypes.string,
    lbl_earnExtraPoints_place_rewards: PropTypes.string,
    lbl_earnExtraPoints_view_points_history: PropTypes.string,
  }),
  promoListData: PropTypes.shape([]),
  isEarnExtraPointsFetching: PropTypes.bool,
  isPromoListFetching: PropTypes.bool,
  openPLCCModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

EarnPoints.defaultProps = {
  className: '',
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
  earnedPointsNotification: [],
  earnExtraPointsLabels: {
    lbl_earnExtraPoints_you_earned: '',
    lbl_earnExtraPoints_place_rewards: '',
    lbl_earnExtraPoints_view_points_history: '',
  },
  promoListData: [],
  isEarnExtraPointsFetching: false,
  isPromoListFetching: false,
};

export default withStyles(EarnPoints, styles);
export { EarnPoints as EarnPointsVanilla };
