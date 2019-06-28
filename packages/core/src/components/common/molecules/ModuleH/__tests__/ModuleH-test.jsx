import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../Carousel';
import { Image } from '../../../atoms';
import ModuleH from '../view';
import ModuleHHeader from '../view/ModuleH.Header';
import ModuleHCTALinks from '../view/ModuleHCTA.Links';
import mock from '../mock';

describe('ModuleH component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ModuleH />).get(0);
    const moduleHComp = shallow(wrapper);
    expect(moduleHComp).toMatchSnapshot();
  });

  it('renders heading correctly', () => {
    const props = {
      data: mock.moduleH.composites.headerText,
    };
    const moduleHHeaderComp = shallow(<ModuleHHeader headerText={props.data} />);
    expect(moduleHHeaderComp.find('.moduleH__header')).toHaveLength(2);
  });

  it('renders CTA links correctly', () => {
    const props = {
      data: mock.moduleH.composites.divCTALinks,
    };
    const currentIndex = {
      current: 0,
      next: 1,
    };
    const ModuleHCTALinksComp = shallow(
      <ModuleHCTALinks dataCTALinks={props.data} currentIndex={currentIndex} />
    );
    expect(ModuleHCTALinksComp.find('.moduleH__CTALink')).toHaveLength(5);
  });

  it('has Carousel wrapper', () => {
    const props = {
      data: mock.moduleH,
    };
    const wrapper = shallow(
      <ModuleH {...props.data}>
        <Carousel carouselConfig={{ type: 'light', arrow: 'none' }}>
          <div>Item1</div>
        </Carousel>
      </ModuleH>
    ).get(0);
    const moduleHComp = shallow(wrapper);
    expect(moduleHComp.find(Carousel)).toHaveLength(1);
  });

  it('renders images correctly', () => {
    const props = {
      data: mock.moduleH.composites.divCTALinks,
    };
    const wrapper = shallow(
      <ModuleH {...props.data}>
        <Carousel {...props.data} carouselConfig={{ type: 'light', arrow: 'none' }}>
          {props.data.map((item, index) => {
            return <Image key={index.toString()} alt={item.image.alt} src={item.image.url} />;
          })}
        </Carousel>
      </ModuleH>
    ).get(0);
    const moduleHImageComp = shallow(wrapper);
    expect(moduleHImageComp.find(Image)).toHaveLength(5);
  });
});
