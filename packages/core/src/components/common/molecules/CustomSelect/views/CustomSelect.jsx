import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from '../../DropdownList';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CustomSelect.style';
import withStyles from '../../../hoc/withStyles';
import CustomSelectConst from './CustomSelect.constants';

class CustomSelect extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      activeTitle: props.activeTitle || CustomSelectConst.DEFAULT_SELECT,
      activeValue: props.activeValue || null,
    };
    this.customSelect = null;
    this.closeDropdownIfClickOutside = this.closeDropdownIfClickOutside.bind(this);
  }

  componentDidMount() {
    this.customSelect = document.querySelector('.custom-select');
    window.addEventListener('click', this.closeDropdownIfClickOutside);
  }

  componentDidUpdate(prevProps) {
    const { activeValue } = this.props;
    if (prevProps.activeValue !== activeValue) {
      this.updateState();
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('click', this.closeDropdownIfClickOutside);
    }
  }

  closeDropdownIfClickOutside = e => {
    if (!this.customSelect.contains(e.target)) {
      this.toggleHandler();
    }
  };

  updateState = () => {
    const { activeValue, activeTitle } = this.props;
    this.setState({
      activeValue,
      activeTitle,
    });
  };

  toggleHandler = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  onClickHandler = (e, value, title) => {
    e.stopPropagation();
    const { clickHandler } = this.props;
    this.setState({
      activeTitle: title,
      activeValue: value,
    });
    this.toggleHandler();
    clickHandler(e, value, title);
  };

  render() {
    const { toggle, activeTitle, activeValue } = this.state;
    const { className, selectListTitle, options } = this.props;
    return (
      <BodyCopy component="div" className={`${className} custom-select`}>
        <span>{selectListTitle}</span>
        <BodyCopy component="div" onClick={this.toggleHandler} className="customSelectTitle">
          {activeTitle}
        </BodyCopy>
        {toggle && (
          <DropdownList
            optionsMap={options}
            clickHandler={this.onClickHandler}
            activeValue={activeValue}
          />
        )}
      </BodyCopy>
    );
  }
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  selectListTitle: PropTypes.string,
  clickHandler: PropTypes.func,
  options: PropTypes.shape({}).isRequired,
  activeTitle: PropTypes.string,
  activeValue: PropTypes.string,
};

CustomSelect.defaultProps = {
  className: '',
  selectListTitle: '',
  activeTitle: '',
  activeValue: '',
  clickHandler: () => {},
};

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
