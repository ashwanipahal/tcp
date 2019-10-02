import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import { Col, DamImage, Row } from '../../../atoms';
import { Carousel, LinkText } from '../..';
import { getLocator } from '../../../../../utils';
import ModuleHCTALinks from './ModuleH.Links';
import style from '../ModuleH.style';
import config from '../config';

/**
 * @class ModuleH - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs
 * This component is plug and play at any given slot in layout by passing required data
 * @param {composites} composites the list of data for header texts, links and images for component
 */
class ModuleH extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      next: 0,
    };
  }

  render() {
    const {
      className,
      divCTALinks,
      headerText,
      accessibility: { playIconButton, pauseIconButton } = {},
    } = this.props;
    const { CAROUSEL_OPTIONS, COL_SIZE, FULL_BLEED, OFFSET_LEFT, IMG_DATA } = config;
    CAROUSEL_OPTIONS.beforeChange = (current, next) => {
      this.setState({ current, next });
    };
    const { current, next } = this.state;
    return (
      <Row fullBleed={FULL_BLEED} className={`${className} moduleH`}>
        <Col colSize={COL_SIZE} offsetLeft={OFFSET_LEFT} className="moduleH__header--wrapper">
          {headerText && (
            <LinkText
              component="h2"
              headerText={headerText}
              className="moduleH__header"
              headingClass="medium_text_white_black"
              dataLocator={getLocator('moduleH_header_text')}
            />
          )}
          {divCTALinks && (
            <ModuleHCTALinks dataCTALinks={divCTALinks} currentIndex={{ current, next }} />
          )}
        </Col>
        <Col colSize={COL_SIZE}>
          <Carousel
            options={CAROUSEL_OPTIONS}
            carouselConfig={{
              autoplay: true,
              dataLocatorPlay: getLocator('moduleH_play_button'),
              dataLocatorPause: getLocator('moduleH_pause_button'),
              type: 'light',
              pauseIconButtonLabel: pauseIconButton,
              playIconButtonLabel: playIconButton,
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

ModuleH.defaultProps = {
  accessibility: {},
};

ModuleH.propTypes = {
  accessibility: PropTypes.shape({
    playIconButton: PropTypes.string,
    pauseIconButton: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  divCTALinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      image: PropTypes.object,
      styled: PropTypes.object,
    })
  ).isRequired,
};

export default withStyles(errorBoundary(ModuleH), style);
export { ModuleH as ModuleHVanilla };
