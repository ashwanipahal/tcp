import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import endpoints from '../../../externalEndpoints';
import { StyledAnchorWrapper, AnchorLeftMargin } from '../styles/RewardsFooterLinks.style.native';

export const RewardsFooterLinks = ({ programDetailsCta, termsConditionCta }) => {
  return (
    <>
      {programDetailsCta && termsConditionCta && (
        <StyledAnchorWrapper>
          <Anchor
            fontSizeVariation="medium"
            underline
            onPress={() => {
              UrlHandler(endpoints.myPlaceRewardsPage);
            }}
            anchorVariation="primary"
            dataLocator="my-rewards-program-details"
            text={programDetailsCta}
          />
          <AnchorLeftMargin>
            <Anchor
              fontSizeVariation="medium"
              underline
              noLink
              onPress={() => {
                UrlHandler(endpoints.termsAndConditionsPage);
              }}
              anchorVariation="primary"
              dataLocator="my-rewards-tnc"
              text={termsConditionCta}
            />
          </AnchorLeftMargin>
        </StyledAnchorWrapper>
      )}
    </>
  );
};

RewardsFooterLinks.propTypes = {
  programDetailsCta: PropTypes.string.isRequired,
  termsConditionCta: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
};

RewardsFooterLinks.defaultProps = {
  labels: {},
};

export default RewardsFooterLinks;
