import React from 'react';
import { FacebookLoginComponent } from './facebookLoginComponent';
import { config } from './config';

const loginComponents = {
  Facebook: FacebookLoginComponent,
};

const renderSocialLogins = (Component, saveSocialAcc) => {
  return <Component saveSocialAcc={saveSocialAcc} />;
};

// const renderAccountsInformation = (accounts, saveSocialAcc) => {
//   return accounts.map((elem, index) => {
//     const isSocialAccount = config.SOCIAL_ACCOUNTS[elem.socialAccount];
//     return (
//       <li className="social-accounts__infoList" key={index.toString()}>
//         <span
//           className={`${isSocialAccount}-icon--${
//             elem.isConnected ? 'enable' : 'disable'
//           } social-accounts__social-icon`}
//         />
//         <span className="social-accounts__infoText">
//           {elem.isConnected
//             ? `${config.SOCIAL_ACCOUNTS[elem.socialAccount]} Connected`
//             : `Connect to ${config.SOCIAL_ACCOUNTS[elem.socialAccount]}`}
//         </span>
//         {renderSocialLogins(
//           loginComponents[config.SOCIAL_ACCOUNTS[1]],
//           saveSocialAcc
//         )}
//       </li>
//     );
//   });
// };

const Socialview = ({ saveSocialAcc, socialLoad }) => {
  return (
    <React.Fragment>
      <section className="social-accounts" data-selector="analytics-social-account">
        <h3 className="social-accounts__title">Social Accounts</h3>
        <p className="social-accounts__subTitle">Link your social accounts to earn extra points!</p>
        <ul>
          <li>
            <FacebookLoginComponent saveSocialAcc={saveSocialAcc} />
          </li>
        </ul>
      </section>
    </React.Fragment>
  );
};

export default Socialview;
