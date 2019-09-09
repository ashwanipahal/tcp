import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from '../../DropdownList';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CustomSelect.style';
import withStyles from '../../../hoc/withStyles';
import CustomSelectConst from './CustomSelect.constants';
import Modal from '../../Modal';

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
      <DropdownList
        optionsMap={options}
        clickHandler={this.onClickHandler}
        activeValue={activeValue}
        className="custom-select-dropDownList"
      />
    );
  };

  render() {
    const { toggle, activeTitle } = this.state;
    const { className, selectListTitle, showModal, modalHeading } = this.props;
    return (
      <BodyCopy component="div" className={`${className} custom-select`}>
        {selectListTitle && <span>{`${selectListTitle}:`}</span>}
        <BodyCopy component="div" onClick={this.toggleHandler} className="customSelectTitle">
          {activeTitle}
        </BodyCopy>
        {toggle && !showModal && <BodyCopy>{this.getDropDownList()}</BodyCopy>}
        {toggle && showModal && (
          <Modal
            fixedWidth
            heading={modalHeading}
            overlayClassName="TCPModal__Overlay"
            className="TCPModal__Content_Modal"
            isOpen={toggle}
            onRequestClose={this.onClose}
            maxWidth="450px"
            minHeight="643px"
            shouldCloseOnOverlayClick={false}
          >
            <BodyCopy>{this.getDropDownList()}</BodyCopy>
          </Modal>
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
  showModal: PropTypes.bool,
  modalHeading: PropTypes.string,
};

CustomSelect.defaultProps = {
  className: '',
  selectListTitle: '',
  activeTitle: '',
  activeValue: '',
  clickHandler: () => {},
  showModal: false,
  modalHeading: '',
};

export default withStyles(CustomSelect, styles);
export { CustomSelect as CustomSelectVanilla };
