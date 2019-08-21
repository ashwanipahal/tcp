import React from 'react';
import {
  ModuleD,
  ModuleH,
  ModuleK,
  ModuleL,
  ModuleN,
} from '@tcp/core/src/components/common/molecules';

// @flow
type Props = {
  name: string,
};

const SlotF = (props: Props) => {
  switch (props.name) {
    case 'moduleD':
      return <ModuleD {...props} />;
    case 'moduleH':
      return <ModuleH {...props} />;
    case 'moduleL':
      return <ModuleL {...props} />;
    case 'moduleK':
      return <ModuleK {...props} />;
    case 'moduleN':
      return <ModuleN {...props} />;
    default:
      return null;
  }
};

export default SlotF;
