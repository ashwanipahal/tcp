import React from 'react';
import { shallow } from 'enzyme';
import { NotificationVanilla } from '../views/Notification';

describe('Notification Component', () => {
  it('should render notification component with status success', () => {
    const status = 'success';
    const colSize = { large: 10, medium: 8, small: 6 };
    const tree = shallow(<NotificationVanilla status={status} colSize={colSize} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render notification component with status error', () => {
    const status = 'error';
    const colSize = { large: 10, medium: 8, small: 6 };
    const tree = shallow(<NotificationVanilla status={status} colSize={colSize} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render notification component with status success with disableSpace', () => {
    const status = 'success';
    const colSize = { large: 10, medium: 8, small: 6 };
    const tree = shallow(<NotificationVanilla status={status} colSize={colSize} disableSpace />);
    expect(tree).toMatchSnapshot();
  });
  it('should render notification component with status info', () => {
    const status = 'info';
    const colSize = { large: 10, medium: 8, small: 6 };
    const tree = shallow(<NotificationVanilla status={status} colSize={colSize} message="show" />);
    expect(tree).toMatchSnapshot();
  });
});
