import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/FullfillmentSection.style';
import PickupStoreModal from '../../PickupStoreModal';

// TODO - These are psuedo files, added to include functionality of PickupStore. These files will be updated later.
// const PickupStoreLabel = 'Pick up in store';

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
    const { className, buttonLabel, dataLocator, btnClassName } = this.props;
    return (
      <React.Fragment>
        <Button
          className={`${className} ${btnClassName} fulfillment-section`}
          fullWidth
          buttonVariation="fixed-width"
          onClick={this.openModal}
          dataLocator={dataLocator}
        >
          {buttonLabel}
        </Button>
        <PickupStoreModal />
      </React.Fragment>
    );
  }
}

FulfillmentSection.propTypes = {
  onPickupOpenClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonLabel: PropTypes.string,
  dataLocator: PropTypes.string,
  btnClassName: PropTypes.string,
};

FulfillmentSection.defaultProps = {
  className: '',
  buttonLabel: '',
  dataLocator: '',
  btnClassName: '',
};

export default withStyles(FulfillmentSection, styles);
export { FulfillmentSection as FulfillmentSectionVanilla };
