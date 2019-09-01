import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import { StyledAnchorWrapper, AnchorLeftMargin } from '../styles/PageHeadingWithLinks.style.native';
import endpoints from '../../../externalEndpoints';

export const PageHeadingWithLinks = ({
  programDetailsCta,
  termsConditionCta,
  children,
  heading,
}) => {
  return (
    <View>
      <StyledHeading>
        <BodyCopy fontSize="fs16" fontWeight="extrabold" text={heading} />
      </StyledHeading>
      <LineComp marginBottom={28} borderWidth={1} borderColor="black" />
      {children}
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
    </View>
  );
};

PageHeadingWithLinks.propTypes = {
  heading: PropTypes.string.isRequired,
  programDetailsCta: PropTypes.string.isRequired,
  termsConditionCta: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  children: PropTypes.string.isRequired,
};

PageHeadingWithLinks.defaultProps = {
  labels: {},
};

export default PageHeadingWithLinks;
