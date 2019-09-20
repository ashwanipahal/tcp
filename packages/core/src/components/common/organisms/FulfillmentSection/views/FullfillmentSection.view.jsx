import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/FullfillmentSection.style';

// TODO - These are psuedo files, added to include functionality of PickupStore. These files will be updated later.
// const PickupStoreLabel = 'Pick up in store';

class FulfillmentSection extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal = e => {
    e.preventDefault();

    // Now we call onQuickViewOpenClick
    // const { onPickupOpenClick } = this.props;
    // eslint-disable-next-line extra-rules/no-commented-out-code
    // onPickupOpenClick();
    const { onQuickViewOpenClick } = this.props;

    onQuickViewOpenClick();
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
      </React.Fragment>
    );
  }
}

FulfillmentSection.propTypes = {
  // onPickupOpenClick: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
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
