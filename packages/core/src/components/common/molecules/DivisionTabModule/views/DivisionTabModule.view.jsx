import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import ButtonTabs from '../../ButtonTabs';
import { BodyCopy } from '../../../atoms';
import styles from '../styles/DivisionTabModule.style';
import { routerPush } from '../../../../../utils';

const onTabChange = url => {
  routerPush(url && url.replace('/c/', '/c?cid='), url, { shallow: true });
};

export class DivisionTabModule extends PureComponent {
  static propTypes = {
    divisionTab: PropTypes.shape({}),
    className: PropTypes.string,
    asPath: PropTypes.string,
  };

  static defaultProps = {
    divisionTab: {},
    className: '',
    asPath: '',
  };

  render() {
    const { divisionTab, className, asPath } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          className="heading"
          fontSize={['fs16', 'fs16', 'fs20']}
          fontFamily="secondary"
          fontWeight="semibold"
        >
          {divisionTab.headLine[0].text}
        </BodyCopy>
        <ButtonTabs
          className="button-tabs"
          selectedTabId={asPath}
          onTabChange={onTabChange}
          tabs={divisionTab.buttonList}
          dataLocator=""
        />
      </div>
    );
  }
}

export { DivisionTabModule as DivisionTabModuleVanilla };
export default withStyles(DivisionTabModule, styles);
