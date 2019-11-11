import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleE/mock';
import { ModuleEVanilla as ModuleE } from '../views/ModuleE';

describe('ModuleE component', () => {
  it('Should render component', () => {
    const wrapper = shallow(
      <ModuleE
        {...mock.moduleA.composites}
        accessibility={{ playIconButton: 'Play', pauseIconButton: 'Pause' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
