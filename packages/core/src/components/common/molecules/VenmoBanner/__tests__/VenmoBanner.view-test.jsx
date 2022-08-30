import React from 'react';
import { shallow } from 'enzyme';
import { VenmoBannerVanilla as VenmoBanner } from '../views/VenmoBanner.view';

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

  it('Module has header', () => {
    expect(component.find('.venmo-logo')).toHaveLength(1);
  });
});
