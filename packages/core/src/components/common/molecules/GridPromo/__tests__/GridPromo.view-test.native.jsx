import React from 'react';
import { shallow } from 'enzyme';
import GridPromo from '../views/GridPromo.view.native';

describe('GridPromo component', () => {
  const props = {
    className: '',
    promoObj: {
      textItems: [{ text: 'one' }, { text: 'two' }, { text: 'three' }],
      subHeadLine: [{ text: '' }],
      promoWrapper: [{ text: '', url: '' }],
      mediaWrapper: [{ text: '', url: '' }],
      variation: 'vertical',
      navigation: {
        dispatch: jest.fn(),
      },
    },
  };

  it('renders correctly', () => {
    const component = shallow(<GridPromo {...props} />);
    expect(component).toMatchSnapshot();
  });
});
