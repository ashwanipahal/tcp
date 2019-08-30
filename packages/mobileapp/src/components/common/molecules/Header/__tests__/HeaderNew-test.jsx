import React from 'react';
import { shallow } from 'enzyme';
import HeaderNew from '../HeaderNew';

describe('HeaderNew Component', () => {
  let component;
  const props = {
    labels: {},
    title: '',
  };

  beforeEach(() => {
    component = shallow(<HeaderNew {...props} />);
  });
  it('HeaderNew should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
