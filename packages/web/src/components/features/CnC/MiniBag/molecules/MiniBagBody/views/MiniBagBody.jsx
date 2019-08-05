import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import MiniBagBodyStyle from '../styles/MiniBagBody.style';
import BagSubHeader from '../../BagSubHeader/views/BagSubHeader';
import ProductTile from '../../ProductTile/views/ProductTile';

const MiniBagBody = () => {
  return (
    <MiniBagBodyStyle>
      <BodyCopy component="div" className="viewBagAndProduct">
        <BagSubHeader />
        <ProductTile />
      </BodyCopy>
    </MiniBagBodyStyle>
  );
};

export default MiniBagBody;
