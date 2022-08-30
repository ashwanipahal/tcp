import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import { Header, EditAnchor } from '../styles/TitlePlusEditButton.style.native';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../../../common/atoms/Anchor';

class TitlePlusEditButton extends React.PureComponent {
  handleClick = event => {
    event.preventDefault();
    const { onEdit } = this.props;
    onEdit();
  };

  render() {
    const { title, editTitle, dataLocator } = this.props;
    return (
      <Header>
        <BodyCopy
          fontSize="fs26"
          dataLocator={`review-${dataLocator}-heading`}
          mobileFontFamily="primary"
          color="gray.900"
          fontWeight="regular"
          text={title}
        />
        <EditAnchor>
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs12"
            mobileFontFamily="secondary"
            dataLocator={`review-${dataLocator}-edit-anchor`}
            onPress={this.handleClick}
            color="gray.900"
            text={editTitle}
          />
        </EditAnchor>
      </Header>
    );
  }
}

TitlePlusEditButton.propTypes = {
  title: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default withStyles(TitlePlusEditButton);
export { TitlePlusEditButton as TitlePlusEditButtonVanilla };
