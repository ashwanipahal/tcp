import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../hoc/withStyles';
import Button from '../../atoms/Button';
import ButtonCTA from '../ButtonCTA';
import style from './DropDownCategoryButton.style';

class DropDownCategoryButton extends React.Component {
  state = {
    open: false,
  };

  openPanel = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  render() {
    const { className, buttonsData, dropdownLabel } = this.props;

    const compProps = {
      ctaProps: {
        ctaVariation: 'fixed-width',
      },
    };

    const { open } = this.state;
    const classToOpen = open ? 'is-open' : '';

    return (
      <div className={`${className} dropdown-category-button-wrapper`}>
        <div className="dropdown-category-button">
          <Button
            className="dropdown-button"
            buttonVariation="fixed-width"
            onClick={this.openPanel}
          >
            {dropdownLabel}
            <span className={`dropdown-icon ${classToOpen}`} />
          </Button>
          <div className={`button-panel ${classToOpen}`}>
            {buttonsData.map(data => {
              const { button = {} } = data;
              const key = button.title && button.title.replace(/\s/g, '_');
              compProps.ctaProps.link = button;

              return <ButtonCTA className="dropdown-items" uniqueKey={key} {...compProps} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

DropDownCategoryButton.propTypes = {
  className: PropTypes.string.isRequired,
  buttonsData: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.object)).isRequired,
  dropdownLabel: PropTypes.string.isRequired,
};

export default withStyles(DropDownCategoryButton, style);
