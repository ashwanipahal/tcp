import React from 'react';
import AddressTileWrapper from '../styles/AddressListComponentSkeleton.style.native';
import AddressSkelton from '../../../../common/molecules/Address/skeleton/AddressSkeleton.view.native';

const AddressListComponentSkeleton = () => {
  return (
    <>
      <AddressTileWrapper>
        <AddressSkelton />
      </AddressTileWrapper>
      <AddressTileWrapper>
        <AddressSkelton />
      </AddressTileWrapper>
    </>
  );
};

export default AddressListComponentSkeleton;
