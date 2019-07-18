import { shallow } from 'enzyme';
import React from 'react';
import { DeleteCardModalVanilla } from '../DeleteCardModal';
import Button from '../../../../../common/atoms/Button';
import Notification from '../../../../../common/molecules/Notification';
// @flow

describe('Delete card Modal', () => {
  const data = {
    heading: 'DELETE ADDRESS',
    title: 'Are you sure you want to delete this address?',
    description: {
      firstName: 'test',
      lastName: 'test',
      addressLine: ['addressline 1', 'addressline 2'],
    },
    buttons: {
      cancel: 'No, Dont Cancel',
      confirm: 'Yes Delete',
    },
    cardText: {
      cardEnd: 'Card ending in ',
      expire: ' Expire on ',
    },
  };
  const labels = {};
  it('should render correctly', () => {
    const tree = shallow(<DeleteCardModalVanilla labels={labels} data={data} />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(Button)).toHaveLength(2);
  });
  it('should call Cancel Button Correctly', () => {
    const mockedCloseModal = jest.fn();
    const tree = shallow(
      <DeleteCardModalVanilla
        data={data}
        labels={labels}
        setDeleteModalMountState={mockedCloseModal}
      />
    );
    tree
      .find(Button)
      .at(1)
      .simulate('click');
    expect(mockedCloseModal).toHaveBeenCalled();
  });
  it('should call confirm Button Correctly', () => {
    const mockedOnConfirm = jest.fn();
    const tree = shallow(
      <DeleteCardModalVanilla labels={labels} data={data} onDeleteCard={mockedOnConfirm} />
    );
    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(mockedOnConfirm).toHaveBeenCalled();
  });
  it('should show notification on error', () => {
    const tree = shallow(
      <DeleteCardModalVanilla
        data={data}
        showUpdatedNotificationOnModal
        labels={{ errorMessage: 'error' }}
      />
    );
    expect(tree.find(Notification)).toHaveLength(1);
  });
});
