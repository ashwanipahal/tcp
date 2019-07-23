import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from '../../DropdownList';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CustomSelect.style';
import withStyles from '../../../hoc/withStyles';

class CustomSelect extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      activeTitle: props.activeTitle || 'Please Select',
      activeValue: props.activeValue || null,
    };
  }

  toggleHandler = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  clickHandler = (e, value, title) => {
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
      <BodyCopy component="div" className={className}>
        <span>{selectListTitle}</span>
        <BodyCopy component="div" onClick={this.toggleHandler} className="customSelectTitle">
          {activeTitle}
        </BodyCopy>
        {toggle && (
          <DropdownList
            optionsMap={options}
            clickHandler={this.clickHandler}
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
  clickHandler: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired,
  activeTitle: PropTypes.string,
  activeValue: PropTypes.string,
};

CustomSelect.defaultProps = {
  className: 'className',
  selectListTitle: '',
  activeTitle: '',
  activeValue: '',
};

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
