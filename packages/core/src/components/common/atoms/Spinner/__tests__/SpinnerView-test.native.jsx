import React from 'react';
import { shallow } from 'enzyme';
import { SpinnerViewVanilla } from '../views/Spinner.native';

describe('SpinnerView Native Componenet', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SpinnerViewVanilla />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return AnimatedComponent component value four', () => {
    expect(component.find('AnimatedComponent')).toHaveLength(4);
  });

  it('should return Styled(View) component value one', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });
});
