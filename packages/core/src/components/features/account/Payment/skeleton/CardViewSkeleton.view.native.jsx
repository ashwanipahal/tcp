import React from 'react';
import PropTypes from 'prop-types';
// import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

import {
  CardViewWrapper,
  StyledHeading,
  CardDetailView,
  CardImageView,
} from '../styles/CardViewSkeleton.style.native';
import BodyCopy from '../../../../common/atoms/BodyCopy';

import AddressSkelton from '../../../../common/molecules/Address/skeleton/AddressSkeleton.view.native';

const CardViewSkeleton = ({ labels }) => {
  return (
    <>
      <StyledHeading>
        <BodyCopy
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_payment_ccHeading', 'paymentGC')}
        />
      </StyledHeading>
      <CardViewWrapper>
        <CardDetailView>
          <ViewWithSpacing spacingStyles="margin-bottom-MED">
            <LoaderSkelton height="25px" />
          </ViewWithSpacing>
          <AddressSkelton />
        </CardDetailView>
        <CardImageView>
          <LoaderSkelton width="60%" height="80px" />
        </CardImageView>
      </CardViewWrapper>
      <StyledHeading>
        <BodyCopy
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_payment_venmoHeading', 'paymentGC')}
        />
      </StyledHeading>
      <CardViewWrapper>
        <CardDetailView>
          <ViewWithSpacing spacingStyles="margin-bottom-MED">
            <LoaderSkelton height="25px" />
          </ViewWithSpacing>
          <AddressSkelton />
        </CardDetailView>
        <CardImageView>
          <LoaderSkelton width="60%" height="80px" />
        </CardImageView>
      </CardViewWrapper>
      <StyledHeading>
        <BodyCopy
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_payment_heading', 'paymentGC')}
        />
      </StyledHeading>
      <CardViewWrapper>
        <CardDetailView>
          <ViewWithSpacing spacingStyles="margin-bottom-MED">
            <LoaderSkelton height="25px" />
          </ViewWithSpacing>
          <AddressSkelton />
        </CardDetailView>
        <CardImageView>
          <LoaderSkelton width="60%" height="80px" />
        </CardImageView>
      </CardViewWrapper>
    </>
  );
};

CardViewSkeleton.propTypes = {
  labels: PropTypes.shape({}),
};

CardViewSkeleton.defaultProps = {
  labels: {},
};
export default CardViewSkeleton;
