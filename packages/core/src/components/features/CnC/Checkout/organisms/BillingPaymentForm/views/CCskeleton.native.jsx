import React from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

const CCskeleton = () => {
  return (
    <>
      <ViewWithSpacing spacingStyles="margin-bottom-MED margin-top-MED">
        <LoaderSkelton width="170px" height="40px" />
      </ViewWithSpacing>
    </>
  );
};
export default CCskeleton;
