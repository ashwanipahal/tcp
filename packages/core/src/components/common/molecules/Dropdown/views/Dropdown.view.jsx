import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/Dropdown.style';
import withStyles from '../../../hoc/withStyles';
import Anchor from '../../../atoms/Anchor';

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropDownExpand: false,
      navState: {
        displayName: '',
        component: props.active || null,
      },
    };
    this.dropDown = null;
  }

  componentDidMount() {
    this.dropDown = document.querySelector('.drop_down');
    window.addEventListener('focusin', this.closeDropdownIfFocusOutside);
    window.addEventListener('click', this.closeDropdownIfFocusOutside);
    const { options, active } = this.props;
    this.calNavState(options, {
      component: active,
    });
  }

  componentDidUpdate(prevProps) {
    const { options = [], active } = this.props;
    if (active !== prevProps.active || options.length !== prevProps.options.length) {
      this.calNavState(options, {
        component: active,
      });
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('focusin', this.closeDropdownIfFocusOutside);
      window.removeEventListener('click', this.closeDropdownIfFocusOutside);
    }
  }

  closeDropdownIfFocusOutside = e => {
    const { dropDownExpand } = this.state;
    if (dropDownExpand && !this.dropDown.contains(e.target)) {
      this.toggleHandler();
    }
  };

  calNavState = (options, navState) => {
    for (let j = 0; j < options.length; j += 1) {
      const nav = options[j];

      if (nav.subSections && nav.subSections.length) {
        for (let i = 0; i < nav.subSections.length; i += 1) {
          if (navState.component === nav.subSections[i].component) {
            this.updateState(nav.subSections[i]);
            break;
          }
        }
      }
      if (navState.component === nav.component) {
        this.updateState(nav);
        break;
      }
    }
  };

  toggleHandler = () => {
    const { dropDownExpand } = this.state;
    this.setState({
      dropDownExpand: !dropDownExpand,
    });
  };

  updateState = nav => {
    this.setState({ navState: nav });
  };

  onClickHandler = (e, nav) => {
    this.updateState(nav);
    this.toggleHandler();
  };

  // Validating and returning if displayname needs to be on caps
  getDisplayName = name => {
    const { isUpperCase } = this.props;
    return isUpperCase ? name && name.toUpperCase() : name;
  };

  subMenuList = (subSection, activeComponent) => {
    return (
      <BodyCopy
        component="div"
        role="link"
        textAlign="center"
        tabIndex={-1}
        onClick={e => this.onClickHandler(e, subSection)}
        fontWeight="extrabold"
        fontSize="fs14"
      >
        <li
          key={subSection.id}
          className={`dropDownLists ${
            activeComponent === subSection.component ? 'dropdownActiveClass' : ''
          }`}
        >
          <Anchor asPath={subSection.url} className="dropdownAnchorColor" to={subSection.href}>
            {this.getDisplayName(subSection.displayName)}
          </Anchor>
        </li>
      </BodyCopy>
    );
  };

  itemLists = (nav, activeComponent) => {
    return (
      <li
        key={nav.id}
        role="option"
        tabIndex={0}
        className={`dropDownLists ${
          activeComponent === nav.component ? 'dropdownActiveClass' : ''
        }`}
        aria-selected={activeComponent === nav.component}
      >
        <BodyCopy
          component="div"
          role="link"
          textAlign="center"
          fontWeight="extrabold"
          fontSize="fs14"
          onClick={e => this.onClickHandler(e, nav)}
        >
          <Anchor asPath={nav.url} className="dropdownAnchorColor" to={nav.href} tabIndex={-1}>
            {this.getDisplayName(nav.displayName)}
          </Anchor>
        </BodyCopy>
      </li>
    );
  };

  render() {
    const { dropDownExpand, navState } = this.state;
    const { className, options } = this.props;

    return (
      <BodyCopy component="div" className={`${className} drop_down`}>
        <BodyCopy
          component="div"
          onClick={this.toggleHandler}
          className="customSelectTitle"
          fontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          fontWeight="extrabold"
          aria-haspopup="listbox"
          aria-expanded={!!dropDownExpand}
          tabIndex={0}
        >
          <BodyCopy
            component="div"
            fontFamily="secondary"
            fontWeight="extrabold"
            className={`customSelectArrow ${dropDownExpand ? 'up' : 'down'}`}
          />
          {this.getDisplayName(navState.displayName)}
        </BodyCopy>
        {dropDownExpand && (
          <BodyCopy component="div" className="dropdownUpperDiv">
            <ul className="dropdownUlBorder dropDownSelect" tabIndex={-1} role="listbox">
              {options.map(nav => this.itemLists(nav, navState.component))}
            </ul>
          </BodyCopy>
        )}
      </BodyCopy>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf({}).isRequired,
  active: PropTypes.string,
  isUpperCase: PropTypes.bool,
};

Dropdown.defaultProps = {
  className: '',
  active: '',
  isUpperCase: false,
};

export default withStyles(Dropdown, styles);
export { Dropdown as DropdownVanilla };
