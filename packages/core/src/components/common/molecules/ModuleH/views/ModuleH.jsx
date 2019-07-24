// @flow
import React from 'react';
import DamImage from '@tcp/core/src/components/common/atoms/DamImage';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';
import { Col, Row } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Carousel } from '../..';
import ModuleHHeader from './ModuleH.Header';
import ModuleHCTALinks from './ModuleH.Links';
import style from '../ModuleH.style';
import config from '../config';

type Props = {
  className: string,
  divCTALinks: Object[],
  headerText: Object[],
};

type State = {
  current: number,
  next: number,
};

/**
 * @class ModuleH - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {composites} composites the list of data for header texts, links and images for component
 */
class ModuleH extends React.PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      current: 0,
      next: 0,
    };
  }

  render() {
    const { className, divCTALinks, headerText } = this.props;
    const { CAROUSEL_OPTIONS, COL_SIZE, FULL_BLEED, OFFSET_LEFT, IMG_DATA } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ current, next });
    };
    const { current, next } = this.state;

    return (
      <Row fullBleed={FULL_BLEED} className={`${className} moduleH`}>
        <Col colSize={COL_SIZE} offsetLeft={OFFSET_LEFT} className="moduleH__header--wrapper">
          <ModuleHHeader headerText={headerText} />
          <ModuleHCTALinks dataCTALinks={divCTALinks} currentIndex={{ current, next }} />
        </Col>
        <Col colSize={COL_SIZE}>
          <Carousel
            options={CAROUSEL_OPTIONS}
            carouselConfig={{
              autoplay: true,
              dataLocator: getLocator('moduleH_play_button'),
              type: 'light',
            }}
          >
            {divCTALinks.map((item, index) => {
              return (
                <DamImage
                  data-locator={`${getLocator('moduleH_composite_image')}_${index + 1}`}
                  key={index.toString()}
                  imgConfigs={IMG_DATA.imgConfig}
                  imgData={item.image}
                />
              );
            })}
          </Carousel>
        </Col>
      </Row>
    );
  }
}

export default errorBoundary(withStyles(ModuleH, style));
export { ModuleH as ModuleHVanilla };
