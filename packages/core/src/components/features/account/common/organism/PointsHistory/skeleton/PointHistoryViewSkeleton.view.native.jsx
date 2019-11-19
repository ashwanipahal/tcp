import React from 'react';

import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { BodyCopy } from '../../../../../../common/atoms';
import { PointHistoryView, PointView, PointTransView } from '../styles/PointHistory.style';

const PointHistoryViewSkeleton = () => {
  return (
    <React.Fragment>
      <PointHistoryView>
        <PointView>
          <BodyCopy text="" fontFamily="secondary" fontSize="fs12" fontWeight="semibold" />
        </PointView>
        <PointTransView>
          <BodyCopy text="" fontFamily="secondary" fontSize="fs12" fontWeight="semibold" />
        </PointTransView>
        <PointView>
          <BodyCopy
            text=""
            component="p"
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="semibold"
          />
        </PointView>
      </PointHistoryView>

      <PointHistoryView>
        <PointView>
          <LoaderSkelton width="100%" height="20px" />
        </PointView>
        <PointTransView>
          <LoaderSkelton width="100%" height="20px" />
        </PointTransView>
        <PointView>
          <LoaderSkelton width="100%" height="20px" />
        </PointView>
      </PointHistoryView>
    </React.Fragment>
  );
};

export default PointHistoryViewSkeleton;
