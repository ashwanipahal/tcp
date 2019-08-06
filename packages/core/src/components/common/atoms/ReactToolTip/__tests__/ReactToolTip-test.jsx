import React from 'react';
import { shallow } from 'enzyme';
import { ReactTooltipVanilla } from '../views/ReactToolTip';

describe('ReactTooltip Component', () => {
  let component;
  const Props = {
    direction: 'top',
    id: 'tool',
    message: 'Total includes any applied promotions or coupons in addition to on sale savings',
    children: {},
  };

  beforeEach(() => {
    component = shallow(<ReactTooltipVanilla {...Props} />);
  });

  it('ReactTooltip should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ReactTooltip should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
