import React from 'react';
import { shallow } from 'enzyme';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { HeaderVanilla } from '../Header';
import { Container, StoreContainer, CartContainer } from '../Header.style';

describe('Header Component', () => {
  let component;
  const props = {
    labels: {},
  };

  beforeEach(() => {
    component = shallow(<HeaderVanilla {...props} />);
  });

  it('Header icons should be defined', () => {
    component.setState({ isIconIn: true });
  });

  it('Header should be defined', () => {
    expect(component).toBeDefined();
  });

  it('Header should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('Header should return Container component value one', () => {
    expect(component.find(Container)).toHaveLength(1);
  });

  it('Header should return StoreContainer component value one', () => {
    expect(component.find(StoreContainer)).toHaveLength(1);
  });

  it('Header should return VerticalRightView component value one', () => {
    expect(component.find(CartContainer)).toHaveLength(1);
  });
  it('Should calculate store time based on current date', () => {
    const componentInstance = component.instance();
    const store = {
      basicInfo: {},
      hours: {
        regularHours: [
          {
            dayName: 'WEDNESDAY',
            openIntervals: [
              {
                fromHour: '2019-10-09 10:00:00',
                toHour: '2019-10-09 20:00:00',
              },
            ],
            isClosed: false,
          },
        ],
        regularAndHolidayHours: [],
        holidayHours: [],
      },
    };
    expect(componentInstance.getStoreHours(store)).toEqual('8 pm');
  });
  it('Header should return ToastContainer component value one', () => {
    expect(component.find(ToastContainer)).toHaveLength(1);
  });
});
