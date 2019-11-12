import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import ButtonTabs from '../../ButtonTabs';
import { BodyCopy } from '../../../atoms';
import styles from '../styles/DivisionTabModule.style';
import { getSiteId } from '../../../../../utils';

const onTabChange = () => {};

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
      <View className={className}>
        <BodyCopy
          className="heading"
          fontSize={['fs16', 'fs16', 'fs20']}
          fontFamily="secondary"
          fontWeight="semibold"
          text={data.headLine[0].text}
        />
        <ButtonTabs
          className="button-tabs"
          selectedTabId={pathWithoutSiteId}
          onTabChange={onTabChange}
          tabs={data.buttonList}
          dataLocator=""
        />
      </View>
    );
  }
}

export { DivisionTabModule as DivisionTabModuleVanilla };
export default withStyles(DivisionTabModule, styles);
