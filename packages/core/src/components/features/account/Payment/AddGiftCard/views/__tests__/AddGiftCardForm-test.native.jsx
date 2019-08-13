import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardFormVanilla } from '../AddGiftCardForm';

describe('Add gift card form component', () => {
  const props = {
    labels: {
      paymentGC: {},
      common: {},
    },
    change: jest.fn(),
  };

  it('should render component correctly', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('simulate add gift card button ', () => {
    const handleSubmit = jest.fn();
    const component = shallow(<AddGiftCardFormVanilla {...props} handleSubmit={handleSubmit} />);

    component
      .find('Styled(CustomButton)')
      .at(0)
      .simulate('press');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('render error message', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.setProps({ addGiftCardResponse: 'foo' });
    expect(component).toMatchSnapshot();
  });
});
