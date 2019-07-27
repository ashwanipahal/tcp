import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from '../../DropdownList';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CustomSelect.style';
import withStyles from '../../../hoc/withStyles';
import CustomSelectConst from './CustomSelect.constants';
import { TextBox } from '../../../atoms';

class CustomSelect extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      activeTitle: props.activeTitle || CustomSelectConst.DEFAULT_SELECT,
      activeValue: props.activeValue || null,
    };
  }

  toggleHandler = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  onClickHandler = (e, value, title) => {
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
    const { className, selectListTitle, options, input } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <span>{selectListTitle}</span>
        <BodyCopy component="div" onClick={this.toggleHandler} className="customSelectTitle">
          {activeTitle}
        </BodyCopy>
        <input type="hidden" {...input} />
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
  clickHandler: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired,
  activeTitle: PropTypes.string,
  activeValue: PropTypes.string,
  input: PropTypes.shape({})
};

CustomSelect.defaultProps = {
  className: '',
  selectListTitle: '',
  activeTitle: '',
  activeValue: '',
  input: {}
};

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
