import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/FullfillmentSection.style';

// TODO - These are psuedo files, added to include functionality of PickupStore. These files will be updated later.
const PickupStoreLabel = 'Pick up in store';

class FulfillmentSection extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal = e => {
    e.preventDefault();
    const { onPickupOpenClick } = this.props;
    onPickupOpenClick();
  };

  render() {
    const { className } = this.props;
    return (
      <Button
        className={`${className} fulfillment-section`}
        fullWidth
        buttonVariation="fixed-width"
        onClick={this.openModal}
      >
        {PickupStoreLabel}
      </Button>
    );
  }
}

FulfillmentSection.propTypes = {
  onPickupOpenClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FulfillmentSection.defaultProps = {
  className: '',
};

export default withStyles(FulfillmentSection, styles);
export { FulfillmentSection as FulfillmentSectionVanilla };
