import React from 'react';
import { shallow } from 'enzyme';
import { GooglePlacesInput } from '../AutoCompleteComponent.native';

describe('AutoCompleteComponent Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<GooglePlacesInput text="test" />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
