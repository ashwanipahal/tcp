import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import MyAccountLayout from '../../views/MyAccountLayout.view';
import navData from '../../MyAccountNavData';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render MyAccountLayoutView Correctly', () => {
    const mainContent = jest.fn();
    const router = {
      asPath: '/',
    };
    const tree = shallow(
      <MyAccountLayout mainContent={mainContent} router={router} navData={navData} />
    );
    expect(tree).toMatchSnapshot();
  });
});
