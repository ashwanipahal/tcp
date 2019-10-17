import React from 'react';
import { shallow } from 'enzyme';
import VenmoBanner from '../views/VenmoBanner.view.native';
import { BodyCopy, Image } from '../../../atoms';

describe('Venmo Banner component', () => {
  let props;
  let component;
  beforeEach(() => {
    props = {
      labels: { VenmoBannerText: '' },
    };
    component = shallow(<VenmoBanner {...props} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('Module has Image', () => {
    expect(component.find(Image)).toHaveLength(1);
  });

  it('Module has Text', () => {
    expect(component.find(BodyCopy)).toHaveLength(1);
  });
});
