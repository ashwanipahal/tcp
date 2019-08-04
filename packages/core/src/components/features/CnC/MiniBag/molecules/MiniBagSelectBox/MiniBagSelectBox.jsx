import React from 'react';
import selectBoxStyle from './MiniBagSelectBox.style';
import { BodyCopy, SelectBox } from '../../../../../common/atoms';

const MiniBagSelect = props => {
  return (
    <BodyCopy fontSize="fs12" fontFamily="secondary">
      <SelectBox {...props} inheritedStyles={selectBoxStyle} />
    </BodyCopy>
  );
};

export default MiniBagSelect;
