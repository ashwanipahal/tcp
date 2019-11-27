import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteCardModal.style';

class VenmoCardModalInfo extends React.Component<Props> {
  render() {
    const { data, className } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          bodySize="seven"
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="deleteCardModal__modalTitle"
        >
          {data.subHeading}
        </BodyCopy>
        <BodyCopy className="deleteCardModal__venmoDesc">
          {' '}
          <Image
            className="deleteCardModal__img"
            src={getIconPath('venmo-blue-acceptance-mark')}
            alt="Venmo Acceptance Mark"
            onClick={this.pause}
          />
          <BodyCopy
            fontWeight="bold"
            fontFamily="secondaryFontFamily"
            className="deleteCardModal__card deleteCardModal__venmoDesc"
            tag="span"
          >
            {data.description.properties.venmoUserId}
          </BodyCopy>
        </BodyCopy>
      </div>
    );
  }
}

VenmoCardModalInfo.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default withStyles(VenmoCardModalInfo, styles);
export { VenmoCardModalInfo as VenmoCardModalInfoVanilla };
