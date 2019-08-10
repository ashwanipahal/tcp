import { shallow } from 'enzyme';
import React from 'react';
import PointsHistory  from '../PointsHistory.view';

describe('Points History Slider View', () => {
  it('should render Points History Correctly', () => {
    const props = {
      pointHistory:[
        {
          pointsEarned: 5,
          transactionTypeName: "AddBirthDate",
          transactionDate: "08/08/19",
          transactionType: "non-transactional",
          pointAwardedDate: "08/08/19",
          pointTransactionType: "Credit"
        }
      ],
      className : "className",
      labels: {
      lbl_common_order_date: '08/08/19',
      lbl_common_transaction: 'Credit',
      lbl_common_points_earned: '5',
      lbl_common_points_history: 'Points History',
      },
    };
    const tree = shallow(<PointsHistory {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
