import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import FormPageHeading from '../../../../common/molecule/FormPageHeading';

export const PointsClaimTopSection = ({ className, labels, onBack }) => {
  return (
    <BodyCopy className={className}>
      <BodyCopy className="elem-mb-LRG">
        <Anchor
          onClick={onBack}
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          dataLocator="ponints-claim-back"
          className="elem-mb-LRG"
          to="/account?id=place-rewards&&subSection=points-history"
          asPath="/account/place-rewards/points-history"
        >
          <span className="left-arrow"> </span>
          {labels.common.lbl_common_backLink}
        </Anchor>
      </BodyCopy>
      <FormPageHeading
        className="elem-mb-XL"
        heading={labels.common.lbl_common_points_claim_heading}
        data-locator="historyPointsLbl"
      />
    </BodyCopy>
  );
};

PointsClaimTopSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PointsClaimTopSection.defaultProps = {
  className: '',
};

export default PointsClaimTopSection;
