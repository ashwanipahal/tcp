import React from 'react';
import { BodyCopy, SelectBox } from '@tcp/core/src/components/common/atoms';
import selectBoxStyle from './MiniBagSelectBox.style';

const MiniBagSelect = props => {
  return (
    <BodyCopy fontSize="fs12" fontFamily="secondary">
      <SelectBox {...props} inheritedStyles={selectBoxStyle} />
    </BodyCopy>
  );
};

export default MiniBagSelect;
