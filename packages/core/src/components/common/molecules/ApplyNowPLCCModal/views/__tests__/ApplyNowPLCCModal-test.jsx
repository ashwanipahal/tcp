import React from 'react';
import { shallow } from 'enzyme';
import ApplyNowPLCCModal from '../../molecules/ApplyNowPLCCModal/views/ApplyNowPLCCModal';

describe('ApplyNowModalWrapper component', () => {
  const props = {
    className: 'abc',
    isPLCCModalOpen: true,
    closePLCCModal: jest.fn(),
    modalStyles: {
      header: 'secondary',
    },
  };

  const component = shallow(<ApplyNowPLCCModal {...props} />);

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
