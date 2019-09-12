/**
 * @module SocialAccountsReadView this method renders the view
 * of social account information.
 *
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { config } from 'util/config/config.js';
import { HyperLink } from 'views/components/common/routing/HyperLink.jsx';
import cssClassName from 'util/viewUtil/cssClassName';
import { MY_ACCOUNT_SECTIONS } from 'routing/routes/myAccountRoutes.js';

/**
 * @method renderSocialAccountIcons
 * @description this method renders the icons of social accounts
 * @param {array} accounts array of objects is required to render
 * The object contains the account name and the connectivity status
 */
export const renderSocialAccountIcons = accounts => {
  return accounts.map(elem => {
    return (
      <span
        className={cssClassName(
          `${config.SOCIAL_ACCOUNTS[elem.socialAccount]}-icon--dark `,
          'social-accounts-read__icons ',
          'social-accounts__read-social-icon'
        )}
        key={elem.socialAccount}
      />
    );
  });
};

/**
 * @method SocialAccountsReadView
 * @description this method renders the component of Social Accounts read
 * view
 * @param {object} props this object contains the required flags needed for
 * rendering the component
 */
export const SocialAccountsReadView = props => {
  const { accounts } = props;
  const accountsAvailable = accounts.length > 0;

  return (
    <div className="social-accounts-read">
      <p className="social-accounts-read__title">
        Connected Social Accounts
        <HyperLink
          aria-label="Add contact preferences"
          className={`social-accounts-read__link analytics-button-acc-overview ${
            accountsAvailable ? 'analytics-social-edit' : 'analytics-social-add'
          }`}
          destination={MY_ACCOUNT_SECTIONS.myPreference}
          queryValues={{ scrollTo: config.ANCHOR_CLASS.SOCIAL }}
        >
          {accountsAvailable ? 'Edit' : 'Add'}
        </HyperLink>
      </p>
      <div>
        {accountsAvailable ? (
          renderSocialAccountIcons(accounts)
        ) : (
          <p className="social-accounts-read__infoText">
            Link an account to earn extra points!
          </p>
        )}
      </div>
    </div>
  );
};

SocialAccountsReadView.propTypes = {
  accounts: PropTypes.arrayOf(Object),
};
