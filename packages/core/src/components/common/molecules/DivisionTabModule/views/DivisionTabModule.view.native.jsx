import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ViewStyleWrapper,
  ButtonTabWrapper,
  Container,
  Wrapper,
  Border,
} from '../styles/DivisionTabModule.style.native';
import withStyles from '../../../hoc/withStyles';
import ButtonTabs from '../../ButtonTabs';
import { BodyCopy } from '../../../atoms';
import styles from '../styles/DivisionTabModule.style';
import { getSiteId } from '../../../../../utils';

const onTabChange = (routeUrl, navigation) => {
  const routeName = routeUrl && routeUrl.includes('-outfits') ? 'OutfitListing' : 'ProductListing';
  const url = routeUrl && routeUrl.replace('/c/', '/c?cid=');
  navigation.navigate(routeName, {
    url,
    reset: true,
  });
};

export class DivisionTabModule extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
    navigation: PropTypes.shape({}),
    asPath: PropTypes.string,
  };

  static defaultProps = {
    data: {},
    navigation: {},
    asPath: '',
  };

  render() {
    const { data, asPath, navigation } = this.props;
    const siteId = getSiteId();
    const pathWithoutSiteId = asPath.replace(`/${siteId}`, '');
    return (
      <ViewStyleWrapper>
        <Container>
          <Border />
          <Wrapper>
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="semibold"
              text={data.headLine[0].text}
              textAlign="center"
            />
          </Wrapper>
          <Border />
        </Container>
        <ButtonTabWrapper>
          <ButtonTabs
            isDivisionTabModule
            selectedTabId={pathWithoutSiteId}
            onTabChange={url => onTabChange(url, navigation)}
            tabs={data.buttonList}
          />
        </ButtonTabWrapper>
      </ViewStyleWrapper>
    );
  }
}

export { DivisionTabModule as DivisionTabModuleVanilla };
export default withStyles(DivisionTabModule, styles);
