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
    const { customSelectClassName } = this.props;
    this.customSelect = document.querySelector(
      customSelectClassName ? `.${customSelectClassName}` : '.custom-select'
    );
    window.addEventListener('click', this.closeDropdownIfClickOutside);
  }

  componentDidUpdate(prevProps) {
    const { activeValue, activeTitle } = this.props;
    if (prevProps.activeValue !== activeValue || prevProps.activeTitle !== activeTitle) {
      this.updateState();
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('click', this.closeDropdownIfClickOutside);
    }
  }

  closeDropdownIfClickOutside = e => {
    const { toggle } = this.state;
    if (toggle && !this.customSelect.contains(e.target)) {
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

  onClose = () => {
    this.toggleHandler();
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

  getDropDownListWithChild = () => {
    const { options, childrenComp, dataLocatorObj, labels } = this.props;
    const { activeValue } = this.state;
    return childrenComp !== null ? (
      childrenComp(options, this.onClickHandler, activeValue, this.onClose)
    ) : (
      <DropdownList
        labels={labels}
        optionsMap={options}
        clickHandler={this.onClickHandler}
        activeValue={activeValue}
        dataLocatorObj={dataLocatorObj}
      />
    );
  };

  getDropDownList = () => {
    const { options, renderList: RenderList } = this.props;
    const { activeValue } = this.state;
    return RenderList ? (
      <RenderList
        optionsMap={options}
        clickHandler={this.onClickHandler}
        activeValue={activeValue}
      />
    ) : (
      this.getDropDownListWithChild()
    );
  };

  render() {
    const { toggle, activeTitle } = this.state;
    const { className, selectListTitle, customSelectClassName, dataLocatorObj } = this.props;
    const { heading } = dataLocatorObj;
    return (
      <BodyCopy component="div" className={`${className} custom-select ${customSelectClassName}`}>
        {selectListTitle && (
          <span className="dropdown-title" data-locator={heading}>{`${selectListTitle}:`}</span>
        )}
        <BodyCopy
          component="div"
          tabIndex="0"
          onClick={this.toggleHandler}
          className="customSelectTitle"
          data-locator={activeTitle}
        >
          <BodyCopy
            component="div"
            fontFamily="secondary"
            fontWeight="extrabold"
            className={`customSelectArrow ${toggle ? 'up' : 'down'}`}
          />
          {activeTitle}
        </BodyCopy>
        {toggle && (
          <BodyCopy component="div" className="dropdownListWrapper">
            {this.getDropDownList()}
          </BodyCopy>
        )}
      </BodyCopy>
    );
  }
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  selectListTitle: PropTypes.string,
  customSelectClassName: PropTypes.string,
  clickHandler: PropTypes.func,
  options: PropTypes.shape({}).isRequired,
  activeTitle: PropTypes.string,
  activeValue: PropTypes.string,
  childrenComp: PropTypes.node,
  dataLocatorObj: PropTypes.shape({}),
};

CustomSelect.defaultProps = {
  className: '',
  selectListTitle: '',
  customSelectClassName: '',
  activeTitle: '',
  activeValue: '',
  clickHandler: () => {},
  childrenComp: null,
  dataLocatorObj: {
    heading: 'drop-down-heading',
    dropDownList: 'drop-down-list',
  },
};

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
