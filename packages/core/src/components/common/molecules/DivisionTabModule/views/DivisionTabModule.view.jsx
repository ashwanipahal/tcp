import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import ButtonTabs from '../../ButtonTabs';
import { BodyCopy } from '../../../atoms';
import styles from '../styles/DivisionTabModule.style';

export class DivisionTabModule extends PureComponent {
  static propTypes = {
    divisionTab: PropTypes.shape({}),
    onTabChange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    divisionTab: {},
    onTabChange: () => {},
    className: '',
  };

  render() {
    const { divisionTab, onTabChange, className } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          className={`${className} heading`}
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="semiBold"
        >
          {divisionTab.composites.headLine[0].text}
        </BodyCopy>
        <ButtonTabs
          className={`${className} button-tabs`}
          selectedTabId="0"
          onTabChange={onTabChange}
          tabs={divisionTab.composites.buttonList}
          dataLocator=""
        />
      </div>
    );
  }
}

export default withStyles(DivisionTabModule, styles);
