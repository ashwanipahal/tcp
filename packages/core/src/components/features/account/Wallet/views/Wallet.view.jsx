import React from 'react';
import PropTypes from 'prop-types';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import MyRewards from '../../common/organism/MyRewards';

const WalletView = ({labels}) => {
  return (
    <div>
      <PageHeadingWithLinks
        heading="lbl_profile_heading"
        programDetailsCta="lbl_profile_terms_condition"
        termsConditionCta="lbl_profile_program_details"
      >
        <MyRewards labels={labels} view="all" />
      </PageHeadingWithLinks>
    </div>
  );
};

WalletView.propTypes = {
  labels: PropTypes.shape({}),
};

WalletView.defaultProps = {
  labels: {},
};

export default WalletView;
