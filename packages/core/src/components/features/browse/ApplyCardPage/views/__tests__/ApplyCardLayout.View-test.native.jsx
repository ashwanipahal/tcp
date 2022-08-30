import React from 'react';
import { shallow } from 'enzyme';
import { ApplyCardLayoutViewVanilla } from '../ApplyCardLayout.View.native';
import constants from '../../RewardsCard.constants';
import ApplicationInProgress from '../../molecules/Common/UnderProgressApplication/ApplicationInProgress.native';
import ExistingPLCCUserView from '../../molecules/Common/ExistingPLCCUser/ExistingPLCCUser.view.native';
import ApprovedPLCCApplicationView from '../../molecules/Common/ApprovedPLCCApplication/ApprovedPLCCApplication.native';
import AddressVerification from '../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import PLCCForm from '../../molecules/Form/PLCCForm/PLCCForm';

describe('ApplyCardLayoutViewVanilla', () => {
  const props = {
    showAddEditAddressForm: false,
    applicationStatus: constants.APPLICATION_STATE_PENDING,
    plccData: {
      plcc_existing_customer_details: 'customer details',
    },
    resetPLCCApplicationStatus: jest.fn(),
    closeAddressVerificationModal: jest.fn(),
  };
  it('should render correctly ApplicationInProgress', () => {
    const component = shallow(<ApplyCardLayoutViewVanilla {...props} />);
    expect(component.find(ApplicationInProgress)).toHaveLength(1);
  });
  it('should render correctly ExistingPLCCUserView', () => {
    props.applicationStatus = constants.APPLICATION_STATE_EXISTING;
    const component = shallow(<ApplyCardLayoutViewVanilla {...props} />);
    expect(component.find(ExistingPLCCUserView)).toHaveLength(1);
  });
  it('should render correctly ApprovedPLCCApplicationView', () => {
    props.applicationStatus = constants.APPLICATION_STATE_APPROVED;
    const component = shallow(<ApplyCardLayoutViewVanilla {...props} />);
    expect(component.find(ApprovedPLCCApplicationView)).toHaveLength(1);
  });
  it('should render correctly AddressVerification', () => {
    props.showAddEditAddressForm = true;
    const component = shallow(<ApplyCardLayoutViewVanilla {...props} />);
    expect(component.find(AddressVerification)).toHaveLength(1);
  });
  it('should render correctly PLCCForm', () => {
    props.applicationStatus = null;
    props.showAddEditAddressForm = false;
    const component = shallow(<ApplyCardLayoutViewVanilla {...props} />);
    expect(component.find(PLCCForm)).toHaveLength(1);
    component
      .instance()
      .onCloseCallBack(props.resetPLCCApplicationStatus, props.closeAddressVerificationModal);
  });
});
