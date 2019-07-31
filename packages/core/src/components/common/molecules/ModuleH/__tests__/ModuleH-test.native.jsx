import React from 'react';
import { shallow } from 'enzyme';
import ModuleH from '../views/ModuleH.native';
import Carousel from '../../Carousel/views/Carousel.native';
import { BodyCopy, Heading } from '../../../atoms';
import mock from '../../../../../services/abstractors/common/moduleH/mock';

describe('ModuleH component', () => {
  let ModuleHComponent;
  beforeEach(() => {
    ModuleHComponent = shallow(<ModuleH {...mock.moduleH.composites} />);
  });

  it('renders correctly', () => {
    expect(ModuleHComponent).toMatchSnapshot();
  });

  it('should render Heading', () => {
    expect(ModuleHComponent.find(Heading)).toHaveLength(2);
  });

  it('should render Links', () => {
    expect(ModuleHComponent.find(BodyCopy)).toHaveLength(5);
  });

  it('should render Carousel', () => {
    expect(ModuleHComponent.find(Carousel)).toHaveLength(1);
  });
});
