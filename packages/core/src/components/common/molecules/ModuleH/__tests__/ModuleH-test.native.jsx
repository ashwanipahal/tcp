import React from 'react';
import { shallow } from 'enzyme';
import ModuleH from '../views/ModuleH.native';
import Carousel from '../../Carousel/views/Carousel.native';
import { BodyCopy, Heading } from '../../../atoms';
import mock from '../mock';

describe('ModuleH component', () => {
  let ModuleHComponent;
  const props = {
    data: mock.moduleH.composites,
  };
  beforeEach(() => {
    ModuleHComponent = shallow(<ModuleH />);
  });

  it('renders correctly', () => {
    expect(ModuleHComponent).toMatchSnapshot();
  });

  it('should render Heading', () => {
    const wrapperWithHeading = shallow(
      <ModuleH {...props.data}>
        <Heading />
      </ModuleH>
    );
    expect(wrapperWithHeading.find(Heading)).toHaveLength(2);
  });

  it('should render Links', () => {
    const wrapperWithLinks = shallow(
      <ModuleH {...props.data}>
        <BodyCopy />
      </ModuleH>
    );
    expect(wrapperWithLinks.find(BodyCopy)).toHaveLength(5);
  });

  it('should render Carousel', () => {
    const wrapperWithCarousel = shallow(
      <ModuleH {...props.data}>
        <Carousel />
      </ModuleH>
    );
    expect(wrapperWithCarousel.find(Carousel)).toHaveLength(1);
  });
});
