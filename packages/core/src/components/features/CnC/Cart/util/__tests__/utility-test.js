import getOrderPointsSummary from '../utility';

// TODO - Include more test cases
describe('#getOrderPointSummary', () => {
  it('should return valid object', () => {
    const resultType = getOrderPointsSummary(
      {
        orderItems: [
          {
            itemInfo: {
              listPrice: 12,
              itemPoints: 12,
              itemId: '123',
            },
          },
        ],
        pointsToNextReward: 1,
        userPoints: 1,
        grandTotal: 1,
        giftCardsTotal: 1,
        bagSubTotal: 123,
        totalItems: 1,
      },
      {
        orderItemId: '123',
      }
    );
    expect(resultType).toEqual({
      pointsToNextReward: 1,
      userPoints: 0,
      bagSubTotal: 0,
      totalItems: 1,
      itemPrice: 0,
      itemPoints: 12,
    });
  });
});
