import { mapStateToProps } from '../BirthdaySavingsPage.container';

describe('BirthdaySavingsPage container', () => {
  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        account: {
          profile: {
            lbl_profile_name: 'test',
          },
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });
});
