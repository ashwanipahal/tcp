import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import { Col } from '../../../atoms';
import DivisionTabModule from '../../../molecules/DivisionTabModule';
import OutfitModule from '../../../molecules/OutfitCarouselModule';
import styles from '../styles/PromoModules.style';
import { JeansModule } from '../../../molecules/JeansModule/views/JeansModule.view';

export class PromoModules extends PureComponent {
  static propTypes = {
    divisionTab: PropTypes.shape({}),
    onTabChange: PropTypes.func,
    className: PropTypes.string,
    outfitModule: PropTypes.shape({}),
    jeanModule: PropTypes.shape({}),
  };

  static defaultProps = {
    divisionTab: {},
    onTabChange: () => {},
    className: '',
    outfitModule: {},
    jeanModule: {},
  };

  render() {
    const { divisionTab, onTabChange, outfitModule, className, jeanModule } = this.props;
    return (
      <Col className={className} colSize={{ small: 6, medium: 8, desktop: 12 }}>
        <JeansModule jeanModule={jeanModule} />
        <OutfitModule outfitModule={outfitModule} />
        <DivisionTabModule divisionTab={divisionTab} onTabChange={onTabChange} />
      </Col>
    );
  }
}

export default withStyles(PromoModules, styles);
