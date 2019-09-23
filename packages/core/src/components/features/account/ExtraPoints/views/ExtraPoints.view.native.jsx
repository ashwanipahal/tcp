import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import endpoints from '../../common/externalEndpoints';
import DetailedEarnExtraPointsTile from '../../common/molecule/DetailedEarnExtraPointsTile';
import ExtraPointsDetailModal from '../organism/ExtraPointsDetailModal.view.native';

import {
  TilesWrapper,
  InnerTileWrapper,
  FirstInnerTileWrapper,
  MprTermsWrapper,
} from '../styles/ExtraPoints.style.native';

/**
 * This function component use for return the EarnPoints
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

  onViewActivityDetails = earnPoints => {
    this.setState({
      waysToEarnRow: earnPoints,
      showModal: true,
    });
  };

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
    const { labels, waysToEarn } = this.props;
    const { waysToEarnRow, showModal } = this.state;

    return (
      <>
        <TilesWrapper>
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
            <ExtraPointsDetailModal waysToEarnRow={waysToEarnRow} />
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
};

EarnPoints.defaultProps = {
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
};

export default EarnPoints;
