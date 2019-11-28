import React from 'react';
import AddressTileWrapper from '../styles/AddressListComponentSkeleton.style.native';
import AddressSkelton from '../../../../common/molecules/GenericSkeleton/GenericSkeleton.view.native';

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
