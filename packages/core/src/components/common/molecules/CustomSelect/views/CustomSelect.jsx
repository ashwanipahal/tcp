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
      defaultTitle: props.defaultTitle || 'Please Select',
      activeClass: props.activeClass || null,
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
      defaultTitle: title,
      activeClass: value,
    });
    this.toggleHandler();
    clickHandler(e, value, title);
  };

  render() {
    const { toggle, defaultTitle, activeClass } = this.state;
    const { className, selectListTitle, options } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <span>{selectListTitle}</span>
        <BodyCopy component="div" onClick={this.toggleHandler} className="customSelectTitle">
          {defaultTitle}
        </BodyCopy>
        {toggle && (
          <DropdownList
            optionsMap={options}
            clickHandler={this.clickHandler}
            activeClass={activeClass}
          />
        )}
      </BodyCopy>
    );
  }
}


CustomSelect.propTypes = {
  className: PropTypes.string.isRequired,
  selectListTitle: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired,
  defaultTitle: PropTypes.string.isRequired,
  activeClass: PropTypes.string.isRequired
};


export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
