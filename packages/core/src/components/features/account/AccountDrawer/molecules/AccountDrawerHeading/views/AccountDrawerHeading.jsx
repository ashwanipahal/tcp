import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerHeading.style';
import Image from '../../../../../../common/atoms/Image';
import { getIconPath } from '../../../../../../../utils';
import Anchor from '../../../../../../common/atoms/Anchor';

const AccountDrawerHeading = props => {
  const { className, labels } = props;
  return (
    <div className={className}>
      <div>
        <span>
          <Image src={getIconPath('user-icon')} />
          <span>{labels.ACC_DRAWER_USER_NAME}</span>
        </span>
        <span>
          <Anchor
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            text={labels.ACC_DRAWER_VIEW_MY_ACC}
          />
        </span>
      </div>
    </div>
  );
};

AccountDrawerHeading.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
};

AccountDrawerHeading.defaultProps = {
  className: '',
  labels: {
    ACC_DRAWER_USER_NAME: 'Test Name',
    ACC_DRAWER_VIEW_MY_ACC: 'View My Account',
  },
};

export default withStyles(AccountDrawerHeading, styles);
export { AccountDrawerHeading as AccountDrawerHeadingVanilla };
