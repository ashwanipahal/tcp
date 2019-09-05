import React from 'react';
import ReactToolTip from '../../../../../../common/atoms/ReactToolTip';
import { Image } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AirmilesToolTip.style';
import { getIconPath } from '../../../../../../../utils';

// @flow

type Props = {
  toolTipText: any,
};
const AirmilesToolTip = ({ toolTipText }: Props) => {
  return (
    <>
      <span className="airmileBannerTooltip">
        <span className="info-icon-img-wrapper">
          <ReactToolTip message={toolTipText} aligned="right">
            <Image src={getIconPath('info-icon')} />
          </ReactToolTip>
        </span>
      </span>
    </>
  );
};

export default withStyles(AirmilesToolTip, styles);
