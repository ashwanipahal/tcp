import React from 'react';
import { shallow } from 'enzyme';
import RemoveSoldOut from '../views/RemoveSoldOut.view.native';

describe('RemoveSoldOut Component', () => {
  let component;
  const Props = {
    labels: 'This is test error',
  };

  beforeEach(() => {
    component = shallow(<RemoveSoldOut {...Props} />);
  });

  it('RemoveSoldOut should be defined', () => {
    expect(component).toBeDefined();
  });

  it('RemoveSoldOut should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
