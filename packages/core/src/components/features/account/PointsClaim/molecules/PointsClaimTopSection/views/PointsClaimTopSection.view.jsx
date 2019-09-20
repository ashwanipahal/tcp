import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
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
          {getLabelValue(labels, 'lbl_common_backLink', 'common')}
        </Anchor>
      </BodyCopy>
      <FormPageHeading
        className="elem-mb-XL"
        heading={getLabelValue(labels, 'lbl_points_claim_heading', 'myPlaceRewards')}
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
