import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteCardModal.style';

// @flow
type Props = {
  data: object,
};

class VenmoCardModalInfo extends React.Component<Props> {
  render() {
    const { data } = this.props;
    return (
      <div>
        <BodyCopy className="deleteCardModal_desc">
          {' '}
          <Image
            className="deleteCardModal_img"
            src={getIconPath('venmo-blue-acceptance-mark')}
            onClick={this.pause}
          />
          <BodyCopy
            fontWeight="bold"
            fontFamily="secondaryFontFamily"
            className="deleteCardModal_card"
            tag="span"
          >
            {data.description.properties.venmoUserId}
          </BodyCopy>
        </BodyCopy>
      </div>
    );
  }
}

export default withStyles(VenmoCardModalInfo, styles);
export { VenmoCardModalInfo as VenmoCardModalInfoVanilla };
