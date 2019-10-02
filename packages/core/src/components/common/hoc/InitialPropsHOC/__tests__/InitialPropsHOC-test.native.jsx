import React from 'react';
import { shallow } from 'enzyme';
import InitialPropsHOC from '../InitialPropsHOC.native';
import BagPageView from '../../../../features/CnC/BagPage/views/BagPage.view.native';

describe('InitialPropsHOC testcases', () => {
  let wrapper;
  const addListener = jest.fn();
  const BagPage = InitialPropsHOC(BagPageView);

  beforeEach(() => {
    wrapper = shallow(<BagPage navigation={{ addListener }} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
