import React from 'react';
import { shallow } from 'enzyme';
import MiniBagSelectBox from '../MiniBagSelectBox';

describe('MiniBagSelectBox component', () => {
  it('MiniBagSelectBox component renders correctly', () => {
    const props = {
      input: {
        name: '',
      },
    };
    const component = shallow(<MiniBagSelectBox {...props} />);
    expect(component).toMatchSnapshot();
  });
});
