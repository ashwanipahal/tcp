import React from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

const AddressSkelton = () => {
  return (
    <div>
      <div className="elem-mb-LRG">
        <LoaderSkelton width="100%" height="42px" />
      </div>
      <div className="elem-mb-LRG">
        <LoaderSkelton width="75%" height="42px" />
      </div>
      <div>
        <LoaderSkelton width="100%" height="42px" />
      </div>
    </div>
  );
};

export default AddressSkelton;
