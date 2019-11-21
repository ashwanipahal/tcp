import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import ButtonTabs from '../../ButtonTabs';
import { BodyCopy } from '../../../atoms';
import styles from '../styles/DivisionTabModule.style';
import { routerPush, getSiteId } from '../../../../../utils';

const onTabChange = url => {
  routerPush(url && url.replace('/c/', '/c?cid='), url, { shallow: true });
};

export class DivisionTabModule extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
    className: PropTypes.string,
    asPath: PropTypes.string,
  };

  static defaultProps = {
    data: {},
    className: '',
    asPath: '',
  };

  render() {
    const { data, className, asPath } = this.props;
    const siteId = getSiteId();
    const pathWithoutSiteId = asPath.replace(`/${siteId}`, '');
    return (
      <div className={className}>
        <BodyCopy
          className="heading"
          fontSize={['fs16', 'fs16', 'fs20']}
          fontFamily="secondary"
          fontWeight="semibold"
        >
          {data.headLine[0].text}
        </BodyCopy>
        <ButtonTabs
          className="button-tabs"
          selectedTabId={pathWithoutSiteId}
          onTabChange={onTabChange}
          tabs={data.buttonList}
          dataLocator=""
        />
      </div>
    );
  }
}

export { DivisionTabModule as DivisionTabModuleVanilla };
export default withStyles(DivisionTabModule, styles);
