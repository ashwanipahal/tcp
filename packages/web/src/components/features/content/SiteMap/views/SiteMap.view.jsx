import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../SiteMap.style';
import { Heading, Anchor, BodyCopy } from '../../../../../../common/atoms';

class SiteMap extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { siteMapData } = this.props;
    const { content, url, categories } = siteMapData;

    return (
      <div class="site_map_container">
        <div class="site_map_heading_container">
          <Heading component="h5" variant="h5" className="site_map_heading">
            <Anchor
              className="heading_link"
              to={url.replace('/c/', '/c?cid=')}
              asPath={url}
            >
              {content}
            </Anchor>
          </Heading>

        </div>
      </div>
    );
  }
}

SiteMap.propTypes = {};

SiteMap.defaultProps = {};

export default withStyles(errorBoundary(SiteMap), style);
export { SiteMap as SiteMapVanilla };
