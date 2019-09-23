import React from 'react';
import { shallow } from 'enzyme';
import BagPage from '../BagPage.view.native';

describe('AddedToBagActions native component', () => {
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'BAG',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 10,
    };
    const component = shallow(<BagPage {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with bag section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'BAG',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'BAG' });
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with SFL section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'SFL',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'SFL' });
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions native component renders correctly with active SFL section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'BAG',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'SFL' });
    expect(component).toMatchSnapshot();
  });

  it('AddedToBagActions native component renders correctly with active BAG section', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
        tagLine: 'tagline',
        bagHeading: 'test',
        savedLaterButton: 'savedLaterButton',
      },
      activeSection: 'SFL',
      navigation: jest.fn(),
      sflItems: {},
      totalCount: 0,
    };
    const component = shallow(<BagPage {...props} />);
    component.setState({ activeSection: 'BAG' });
    expect(component).toMatchSnapshot();
  });
});
