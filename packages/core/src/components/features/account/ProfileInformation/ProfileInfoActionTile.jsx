/**
 * @module ProfileInfoActionTile
 * The tile displays the profile information title
 * with corresponding actions and points earned on
 * particular activity.
 * @author Ipsita Basak <ipsbasak@publicisgroupe.net>
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import cssClassName from 'util/viewUtil/cssClassName';
import { HyperLink } from 'views/components/common/routing/HyperLink.jsx';
import { PAGES } from 'routing/routes/pages.js';

const ProfileInfoActionTile = props => {
  let {
    activityId,
    activityIcon,
    activityTitle,
    activityDescription,
    activityCompletionState,
    onClick,
    redirectTo,
  } = props;

  const activityClass = `profile-actions-${activityId}`;
  let activityStateClass = cssClassName('profile-action-tile ', {
    'activity-complete': activityCompletionState,
  });
  // If the activity is complete, the anchor should not be created
  if (activityCompletionState) {
    onClick = '';
    redirectTo = '';
  }
  const titleToShow = activityCompletionState || activityTitle;
  if (redirectTo) {
    activityStateClass += ' anchor-container';
    return (
      <div className={activityStateClass}>
        <HyperLink
          destination={PAGES[redirectTo]}
          className="overlap-anchor"
          aria-label="Update default store"
        />
        <div className={`${activityClass}`}>
          <figure className="completed-image-wrapper">
            <img
              alt={activityDescription}
              className="completed-image"
              src="/wcsstore/static/images/done-check.png"
              title={activityDescription}
            />
          </figure>
          <div className="activity-img-wrapper">
            <img
              alt={activityDescription}
              className="activity-img"
              src={activityIcon}
              title={activityDescription}
            />
          </div>
          <h4 className="activity-title">{titleToShow}</h4>
          <p className="activity-description">{activityDescription}</p>
        </div>
      </div>
    );
  }
  return (
    <button className={activityStateClass} type="button" onClick={onClick}>
      <div className={activityClass}>
        <figure className="completed-image-wrapper">
          <img
            alt={activityDescription}
            className="completed-image"
            src="/wcsstore/static/images/done-check.png"
            title={activityDescription}
          />
        </figure>
        <div className="activity-img-wrapper">
          <img
            alt={activityDescription}
            className="activity-img"
            src={activityIcon}
            title={activityDescription}
          />
        </div>
        <h4 className="activity-title">{titleToShow}</h4>
        <p className="activity-description">{activityDescription}</p>
      </div>
    </button>
  );
};

ProfileInfoActionTile.prototype = {
  activityId: PropTypes.string,
  activityIcon: PropTypes.string,
  activityTitle: PropTypes.string,
  activityDescription: PropTypes.string,
  activityCompletionState: PropTypes.string,
  onClick: PropTypes.string,
  redirectTo: PropTypes.string,
};

ProfileInfoActionTile.defaultProps = {
  activityId: '',
  activityIcon: '',
  activityTitle: '',
  activityDescription: '',
  activityCompletionState: '',
  onClick: '',
  redirectTo: '',
};

export default ProfileInfoActionTile;
