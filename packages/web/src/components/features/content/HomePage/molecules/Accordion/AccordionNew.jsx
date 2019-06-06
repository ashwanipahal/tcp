import React, { Component, Fragment } from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import styles from './Accordion.style';

class Accordion extends Component {
  state = {
    clicked: false,
  };

  componentWillMount() {}

  itemDetailClick = () => {
    this.setState(prevstate =>({
      clicked: !prevstate.clicked,
    }));
  };

  render() {
    const { className = '', children, title } = this.props;
    return (
      <Fragment>
        <div className={`${className} accordion`} aria-label="accordion">
          <a onClick={this.itemDetailClick} nolink href="#">
            <p className={this.state.clicked ? 'inactive head' : 'active head'}>{title}</p>
          </a>
          {this.state.clicked ? <div className={'accordionContents'}>{children}</div> : ''}
        </div>
      </Fragment>
    );
  }
}

Accordion.propTypes = {
  props: PropTypes.shape({
    className: PropTypes.string,
    children: PropTypes.string,
    title: PropTypes.string,
  }),
};

Accordion.displayName = 'Accordion';

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
