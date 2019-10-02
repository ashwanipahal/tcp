import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../hoc/withStyles';
import Button from '../../atoms/Button';
import ButtonCTA from '../ButtonCTA';
import style from './DropDownButton.style';
import { generateUniqueKeyUsingLabel } from '../../../../utils';

class DropDownButton extends React.PureComponent {
  state = {
    open: false,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.openDropDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.openDropDown);
  }

  openDropDown = e => {
    if (e.target.classList.contains('dropdown-button')) {
      return false;
    }
    this.setState({
      open: false,
    });

    return true;
  };

  togglePanel = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  render() {
    const {
      className,
      buttonsData,
      dropdownLabel,
      dataLocator,
      dataLocatorItemPrefix,
    } = this.props;
    const { open } = this.state;
    const classToOpen = open ? 'is-open' : '';

    return (
      <div className={`${className} dropdown-button-wrapper`}>
        <div className="dropdown-button-container">
          <Button
            className={`dropdown-button ${classToOpen}`}
            buttonVariation="fixed-width"
            data-locator={dataLocator}
            onClick={this.togglePanel}
          >
            {dropdownLabel}
            <span className={`dropdown-icon ${classToOpen}`} />
          </Button>
          <div className={`button-panel ${classToOpen}`}>
            {buttonsData.map((data, index) => {
              const { button = {} } = data;
              const compProps = {
                ctaInfo: {
                  ctaVariation: 'fixed-width',
                  link: button,
                },
                dataLocator: `${dataLocatorItemPrefix}${index}`,
                noCurve: true,
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
  buttonsData: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  dropdownLabel: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  dataLocatorItemPrefix: PropTypes.string.isRequired,
};

export { DropDownButton as DropDownButtonVanilla };
export default withStyles(DropDownButton, style);
