import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import externalEndpoints from '../../../externalEndpoints';
import styles from '../styles/RewardsFooterLinks.styles';

export const RewardsFooterLinks = ({ className, programDetailsCta, termsConditionCta }) => {
  return (
    <>
      <div className={className}>
        {programDetailsCta && termsConditionCta && (
          <BodyCopy className="footer-links-wrapper" component="div">
            <Anchor
              fontSizeVariation="large"
              underline
              noLink
              href={externalEndpoints.myPlaceRewardsPage}
              anchorVariation="primary"
              dataLocator="program_details_cta"
              target="_blank"
            >
              {programDetailsCta}
            </Anchor>

            <Anchor
              fontSizeVariation="large"
              underline
              noLink
              href={externalEndpoints.termsAndConditionsPage}
              anchorVariation="primary"
              dataLocator="terms_condition_cta"
              className="elem-ml-XXL"
            >
              {termsConditionCta}
            </Anchor>
          </BodyCopy>
        )}
      </div>
    </>
  );
};

RewardsFooterLinks.propTypes = {
  className: PropTypes.string.isRequired,
  programDetailsCta: PropTypes.string.isRequired,
  termsConditionCta: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
};

RewardsFooterLinks.defaultProps = {
  labels: {},
};

export default withStyles(RewardsFooterLinks, styles);
