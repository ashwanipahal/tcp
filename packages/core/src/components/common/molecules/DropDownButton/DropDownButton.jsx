import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../hoc/withStyles';
import Button from '../../atoms/Button';
import ButtonCTA from '../ButtonCTA';
import style from './DropDownButton.style';
import { generateUniqueKeyUsingLabel } from '../../../../utils/utils';

class DropDownButton extends React.Component {
  state = {
    open: false,
  };

  togglePanel = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  render() {
    const { className, buttonsData, dropdownLabel } = this.props;
    const { open } = this.state;
    const classToOpen = open ? 'is-open' : '';

    return (
      <div className={`${className} dropdown-button-wrapper`}>
        <div className="dropdown-button-container">
          <Button
            className="dropdown-button"
            buttonVariation="fixed-width"
            onClick={this.togglePanel}
          >
            {dropdownLabel}
            <span className={`dropdown-icon ${classToOpen}`} />
          </Button>
          <div className={`button-panel ${classToOpen}`}>
            {buttonsData.map(data => {
              const { button = {} } = data;
              const compProps = {
                ctaInfo: {
                  ctaVariation: 'fixed-width',
                  link: button,
                },
              };
              // Code to generate unique key
              const key = button.title && generateUniqueKeyUsingLabel(button.title);

              return <ButtonCTA className="dropdown-items" uniqueKey={key} {...compProps} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

DropDownButton.propTypes = {
  className: PropTypes.string.isRequired,
  buttonsData: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.object)).isRequired,
  dropdownLabel: PropTypes.string.isRequired,
};

export default withStyles(DropDownButton, style);
