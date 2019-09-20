import { shallow } from 'enzyme';
import React from 'react';
import PointsHistoryList from '../PointsHistoryList.view';

describe('Points History List Page View', () => {
  it('should render Points History Page Correctly', () => {
    const props = {
      pointHistory: [
        {
          pointsEarned: 5,
          transactionTypeName: 'AddBirthDate',
          transactionDate: '08/08/19',
          transactionType: 'non-transactional',
          pointAwardedDate: '08/08/19',
          pointTransactionType: 'Credit',
        },
      ],
      className: 'className',
      showFullHistory: true,
      labels: {
        lbl_common_order_date: '08/08/19',
        lbl_common_transaction: 'Credit',
        lbl_common_points_earned: '5',
        lbl_common_points_history: 'Points History',
      },
    };
    const tree = shallow(<PointsHistoryList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
