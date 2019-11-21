import React from 'react';
import { shallow } from 'enzyme';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { HeaderNewVanilla } from '../HeaderNew';

describe('HeaderNew Component', () => {
  let component;
  const props = {
    labels: {},
    title: '',
  };

  beforeEach(() => {
    component = shallow(<HeaderNewVanilla {...props} />);
  });
  it('HeaderNew should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('HeaderNew should return ToastContainer component value one', () => {
    expect(component.find(ToastContainer)).toHaveLength(1);
  });
});
