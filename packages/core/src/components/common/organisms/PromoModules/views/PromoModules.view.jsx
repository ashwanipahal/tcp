import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import { Col } from '../../../atoms';
import styles from '../styles/PromoModules.style';
import DivisionTabModule from '../../../molecules/DivisionTabModule';
import OutfitModule from '../../../molecules/OutfitCarouselModule';
import JeansModule from '../../../molecules/JeansModule';

export class PromoModules extends PureComponent {
  static propTypes = {
    divisionTab: PropTypes.shape({}),
    onTabChange: PropTypes.func,
    className: PropTypes.string,
    outfitModule: PropTypes.shape({}),
    jeansModule: PropTypes.shape({}),
    asPath: PropTypes.string,
    plpTopPromos: PropTypes.shape({}),
  };

  static defaultProps = {
    divisionTab: {},
    onTabChange: () => {},
    className: '',
    outfitModule: {},
    jeansModule: {},
    asPath: '',
    plpTopPromos: {},
  };

  render() {
    const { onTabChange, className, asPath, plpTopPromos } = this.props;
    console.log('plpTopPromos ############################# ', plpTopPromos);

    const divisionTab = plpTopPromos[2];
    const outfitModule = plpTopPromos[0];
    const jeansModule = plpTopPromos[1];

    console.log('jeansModule', jeansModule);
    return (
      <Col className={className} colSize={{ small: 6, medium: 8, desktop: 12 }}>
        {jeansModule && <JeansModule jeansModule={jeansModule} />}
        {outfitModule && <OutfitModule outfitModule={outfitModule} />}
        {divisionTab && (
          <DivisionTabModule divisionTab={divisionTab} onTabChange={onTabChange} asPath={asPath} />
        )}
      </Col>
    );
  }
}

export default withStyles(PromoModules, styles);
