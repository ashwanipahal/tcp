import React from 'react';
import { ModuleD, ModuleH } from '@tcp/core/src/components/common/molecules';

// @flow
type Props = {
  name: string,
};

const SlotA = (props: Props) => {
  switch (props.name) {
    case 'moduleD':
      return <ModuleD {...props} />;
    case 'moduleH':
      return <ModuleH {...props} />;
    default:
      return null;
  }
};

export default SlotA;
