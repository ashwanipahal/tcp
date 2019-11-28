import React from 'react';
import { shallow } from 'enzyme';
import { AccordionModuleVanilla as AccordionModule } from '../views/AccordionModule';
import mock from '../../../../../services/abstractors/common/AccordionModule/mock';

describe('Accordion Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AccordionModule {...mock.composites} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
