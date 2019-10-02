import ctaRedirect from '../utils';
import internalEndpoints from '../../../../common/internalEndpoints';

const ctaRewardPlaceApp = {
  to: 'https://www.childrensplace.com/us/content/mobile',
  path: 'https://www.childrensplace.com/us/content/mobile',
};
const ctaSurvey = {
  to: `${internalEndpoints.profilePage.link}&survey=true`,
  path: `${internalEndpoints.profilePage.path}/?survey=true`,
};
const ctaFavStore = {
  to: internalEndpoints.profilePage.link,
  path: internalEndpoints.profilePage.path,
};
const ctauserMailing = {
  to: internalEndpoints.mailingAddressPage.link,
  path: internalEndpoints.mailingAddressPage.path,
};
const ctaBirthdaySavings = {
  to: internalEndpoints.birthdaySavingsPage.link,
  path: internalEndpoints.birthdaySavingsPage.path,
};
const ctaUserBirthday = {
  to: internalEndpoints.editProfileInformationPage.link,
  path: internalEndpoints.editProfileInformationPage.path,
};
const ctaOrders = {
  to: internalEndpoints.orderPage.link,
  path: internalEndpoints.orderPage.path,
};

describe('CTA link based on active activity ', () => {
  it('should link to correct path based on activityModalAction as rewardPlaceApp', () => {
    const activeActivity = {
      activityModalAction: 'rewardPlaceApp',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctaRewardPlaceApp));
  });

  it('should link to correct path based on activityModalAction as userAboutYourselfSurvey', () => {
    const activeActivity = {
      activityModalAction: 'userAboutYourselfSurvey',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctaSurvey));
  });

  it('should link to correct path based on activityModalAction as userFavoriteStore', () => {
    const activeActivity = {
      activityModalAction: 'userFavoriteStore',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctaFavStore));
  });
  it('should link to correct path based on activityModalAction as userMailing', () => {
    const activeActivity = {
      activityModalAction: 'userMailing',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctauserMailing));
  });
  it('should link to correct path based on activityModalAction as orders', () => {
    const activeActivity = {
      activityModalAction: 'orders',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctaOrders));
  });
  it('should link to correct path based on activityModalAction as birthdaySavings', () => {
    const activeActivity = {
      activityModalAction: 'birthdaySavings',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctaBirthdaySavings));
  });
  it('should link to correct path based on activityModalAction as userBirthday', () => {
    const activeActivity = {
      activityModalAction: 'userBirthday',
    };
    const returnVal = JSON.stringify(ctaRedirect(activeActivity));
    expect(returnVal).toBe(JSON.stringify(ctaUserBirthday));
  });
});
