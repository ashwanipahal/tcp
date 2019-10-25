import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import PromoListTile from '@tcp/core/src/components/common/molecules/PromoListTile/views';
import endpoints from '../../common/externalEndpoints';
import DetailedEarnExtraPointsTile from '../../common/molecule/DetailedEarnExtraPointsTile';
import ExtraPointsDetailModal from '../organism/ExtraPointsDetailModal.view.native';

import {
  TilesWrapper,
  InnerTileWrapper,
  FirstInnerTileWrapper,
  MprTermsWrapper,
  MessageInfoWrapper,
  MorePointsWrapper,
  ExtraEarningHeader,
  PromoTileWrapper,
  LineBorder,
} from '../styles/ExtraPoints.style.native';

/**
 * This class component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */
export class EarnPoints extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: null,
    };
  }

  /**
   * onViewActivityDetails function used to set modal toggle state
   * @param waysToEarnRow - waysToEarnRow object used for showing extra points details
   */

  onViewActivityDetails = earnPoints => {
    this.setState({
      waysToEarnRow: earnPoints,
      showModal: true,
    });
  };

  /**
   * toggle modal to open and closed
   */

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const {
      labels,
      waysToEarn,
      earnedPointsNotification,
      earnExtraPointsLabels,
      handleComponentChange,
      promoListData,
    } = this.props;
    const { waysToEarnRow, showModal } = this.state;
    let infoMessage = '';
    if (earnedPointsNotification && earnedPointsNotification.length) {
      infoMessage = `${earnedPointsNotification[0].transactionDate} ${getLabelValue(
        earnExtraPointsLabels,
        'lbl_earnExtraPoints_you_earned'
      )} ${earnedPointsNotification[0].pointsEarned} ${getLabelValue(
        earnExtraPointsLabels,
        'lbl_earnExtraPoints_place_rewards'
      )} `;
    }
    return (
      <>
        {earnedPointsNotification && earnedPointsNotification.length ? (
          <Notification status="info" className="elem-mt-MED">
            <MessageInfoWrapper>
              <BodyCopy
                fontSize="fs14"
                fontWeight="extrabold"
                fontFamily="secondary"
                dataLocator="earnPoints-message"
                text={infoMessage}
                color="gray.900"
              />
              <Anchor
                fontSizeVariation="large"
                underline
                onPress={() => handleComponentChange('pointsHistoryMobile')}
                anchorVariation="primary"
                dataLocator="earnPoints-points-history"
                text={getLabelValue(
                  earnExtraPointsLabels,
                  'lbl_earnExtraPoints_view_points_history'
                )}
              />
            </MessageInfoWrapper>
          </Notification>
        ) : null}
        <ExtraEarningHeader>
          <BodyCopyWithSpacing
            fontFamily="primary"
            fontSize="fs28"
            fontWeight="extrabold"
            text={getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_youAreEarning')}
            spacingStyles="margin-top-LRG margin-right-LRG margin-bottom-MED margin-left-LRG"
            textAlign="center"
          />
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs16"
            text={getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_checkOffers')}
            spacingStyles="margin-right-MED margin-left-MED"
            textAlign="center"
            fontWeight="regular"
          />
          <ViewWithSpacing spacingStyles="margin-top-SM margin-bottom-XL">
            <Anchor
              fontSizeVariation="large"
              underline
              noLink
              anchorVariation="primary"
              onPress={() => {
                UrlHandler(endpoints.myPlaceRewardsPage);
              }}
              text={getLabelValue(earnExtraPointsLabels, 'lbl_earnExtraPoints_learnMore')}
            />
          </ViewWithSpacing>
        </ExtraEarningHeader>
        <TilesWrapper>
          {promoListData &&
            promoListData.length > 0 &&
            promoListData.map((item, index) => {
              return (
                <>
                  {item && (index === 0 || index === 2) && (
                    <>
                      <PromoTileWrapper>
                        <PromoListTile tileData={item} />
                      </PromoTileWrapper>
                      <LineBorder />
                    </>
                  )}
                  {item && (index === 1 || index === 3) && (
                    <PromoTileWrapper>
                      <PromoListTile tileData={item} />
                    </PromoTileWrapper>
                  )}
                </>
              );
            })}
        </TilesWrapper>

        {waysToEarn && (
          <TilesWrapper>
            <MorePointsWrapper>
              <BodyCopy
                component="p"
                fontSize="fs18"
                fontFamily="secondary"
                fontWeight="semibold"
                textAlign="center"
                color="gray.900"
                text={getLabelValue(labels, 'lbl_extraExtraPoints_more_points')}
                dataLocator="earn-points-morePoints-text"
              />
            </MorePointsWrapper>
            {waysToEarn &&
              waysToEarn.map((item, index) => (
                <>
                  {item && index === 0 && (
                    <FirstInnerTileWrapper>
                      <DetailedEarnExtraPointsTile
                        key={index.toString()}
                        waysToEarnRow={item}
                        onViewActivityDetails={this.onViewActivityDetails}
                        labels={labels}
                        viewAll
                      />
                    </FirstInnerTileWrapper>
                  )}
                  {item && index > 0 && (
                    <InnerTileWrapper>
                      <DetailedEarnExtraPointsTile
                        key={index.toString()}
                        waysToEarnRow={item}
                        onViewActivityDetails={this.onViewActivityDetails}
                        labels={labels}
                        viewAll
                      />
                    </InnerTileWrapper>
                  )}
                </>
              ))}
          </TilesWrapper>
        )}
        <MprTermsWrapper>
          <Anchor
            fontSizeVariation="large"
            underline
            noLink
            onPress={() => {
              UrlHandler(endpoints.mprTermsPage);
            }}
            anchorVariation="primary"
            dataLocator="earn-points-mpr-link"
            text={getLabelValue(labels, 'lbl_common_check_here')}
          />
          <BodyCopy
            component="p"
            fontSize="fs14"
            fontFamily="secondary"
            color="gray.900"
            text={getLabelValue(labels, 'lbl_common_extra_points_terms_conditions')}
            dataLocator="earn-points-mpr-text"
          />
        </MprTermsWrapper>

        <ModalNative
          isOpen={showModal}
          onRequestClose={this.toggleModal}
          horizontalBar={false}
          heading=" "
        >
          <ViewWithSpacing spacingStyles="margin-left-LRG margin-right-LRG">
            <ExtraPointsDetailModal
              waysToEarnRow={waysToEarnRow}
              handleComponentChange={handleComponentChange}
            />
          </ViewWithSpacing>
        </ModalNative>
      </>
    );
  }
}

EarnPoints.propTypes = {
  waysToEarn: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
  earnedPointsNotification: PropTypes.shape([]),
  promoListData: PropTypes.shape([]),
  earnExtraPointsLabels: PropTypes.shape({
    lbl_earnExtraPoints_you_earned: PropTypes.string,
    lbl_earnExtraPoints_place_rewards: PropTypes.string,
    lbl_earnExtraPoints_view_points_history: PropTypes.string,
  }),
  handleComponentChange: PropTypes.func,
};

EarnPoints.defaultProps = {
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
  earnedPointsNotification: [],
  promoListData: [],
  earnExtraPointsLabels: {
    lbl_earnExtraPoints_you_earned: '',
    lbl_earnExtraPoints_place_rewards: '',
    lbl_earnExtraPoints_view_points_history: '',
  },
  handleComponentChange: () => {},
};

export default EarnPoints;
