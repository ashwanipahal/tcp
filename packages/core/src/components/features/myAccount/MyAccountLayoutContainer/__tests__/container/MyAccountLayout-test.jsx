import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import MyAccountLayout from '../../container/MyAccountLayout.container';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render MyAccountLayout Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<MyAccountLayout mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
