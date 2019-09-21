import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/TitlePlusEditButton.style';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../../../common/atoms/Anchor';

class TitlePlusEditButton extends React.PureComponent {
  handleClick = event => {
    event.preventDefault();
    const { onEdit } = this.props;
    onEdit();
  };

  render() {
    const { title, editTitle, className, dataLocator } = this.props;
    return (
      <div className={className}>
        <div className="header">
          <BodyCopy
            fontSize="fs26"
            dataLocator={`review-${dataLocator}-heading`}
            fontFamily="primary"
            color="gray.900"
            fontWeight="regular"
          >
            {title}
          </BodyCopy>
          <div className="EditAnchor">
            <Anchor
              underline
              anchorVariation="secondary"
              fontSize="fs12"
              fontFamily="secondary"
              dataLocator={`review-${dataLocator}-edit-anchor`}
              onClick={this.handleClick}
              className="anchorStyle"
              color="gray.900"
            >
              {editTitle}
            </Anchor>
          </div>
        </div>
      </div>
    );
  }
}

TitlePlusEditButton.propTypes = {
  title: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default withStyles(TitlePlusEditButton, styles);
export { TitlePlusEditButton as TitlePlusEditButtonVanilla };
