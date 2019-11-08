import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleE/mock';
import { ModuleEVanilla as ModuleE } from '../views/ModuleE';

describe('ModuleE component', () => {
  const wrapper = shallow(<ModuleE {...mock.moduleE.composites} />).get(0);
  const ModuleEComp = shallow(wrapper);
});
