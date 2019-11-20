import React from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import AddressViewWrapper from '../styles/Address.style.native';

const AddressSkelton = () => {
  return (
    <AddressViewWrapper>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="20px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="75%" height="20px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="20px" />
      </ViewWithSpacing>
    </AddressViewWrapper>
  );
};
export default AddressSkelton;
