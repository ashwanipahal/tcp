// @flow
import React from 'react';
import DamImage from '@tcp/core/src/components/common/atoms/DamImage';
import config from '../config';
import { Anchor, Button, Col, Row } from '../../../atoms';
import { Grid } from '../..';
import Heading from '../../../atoms/Heading';
import { getLocator } from '../../../../../utils';
import style from '../ModuleD.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

type Props = {
  className: String,
  headerText: Object,
  smallCompImage: Object,
  singleCTAButton: Object,
};

const colSize2Elements = {
  small: 3,
  medium: 4,
  large: 6,
  xlarge: 6,
};

const colSize4Elements = {
  small: 3,
  medium: 2,
  large: 3,
  xlarge: 3,
};

const colSize6Elements = {
  small: 3,
  medium: 3,
  large: 2,
  xlarge: 2,
};

const ignoreGutter = [
  {},
  { small: true },
  {},
  { small: true, medium: true },
  {},
  { small: true, medium: true },
];

const ModuleD = (props: Props) => {
  const { className, headerText, smallCompImage, singleCTAButton } = props;
  const {
    textLines: [{ text: headingText }],
    link: { target, title, url },
  } = headerText;
  let colSize;
  let imgDataConfig;

  if (smallCompImage && smallCompImage.length === 2) {
    colSize = colSize2Elements;
    imgDataConfig = config.IMG_DATA_2.imgConfig;
  } else if (smallCompImage && smallCompImage.length === 4) {
    colSize = colSize4Elements;
    imgDataConfig = config.IMG_DATA_4.imgConfig;
  } else {
    colSize = colSize6Elements;
    imgDataConfig = config.IMG_DATA_6.imgConfig;
  }

  return (
    <Grid className={className}>
      <Anchor className="moduleD_textlink" to={url} target={target}>
        <Heading
          className="moduleD_header"
          variant="h2"
          data-locator={getLocator('moduleD_headerlink')}
          textAlign="center"
          color="text.primary"
          title={title}
        >
          {headingText}
        </Heading>
      </Anchor>
      <Row centered>
        {smallCompImage &&
          smallCompImage.map((item, index) => {
            return (
              item.link && (
                <Col
                  key={index.toString()}
                  colSize={colSize}
                  ignoreGutter={ignoreGutter[index]}
                  className="moduleD_tile"
                >
                  <div className="moduleD__image-container">
                    <Anchor
                      className="moduleD_textlink"
                      to={item.link.url}
                      aria-label={item.link.text}
                      title={item.link.title}
                      target={item.link.target}
                    >
                      <DamImage
                        className="moduleD_image"
                        data-locator={`${getLocator('moduleD_image')}_${index + 1}`}
                        imgConfigs={imgDataConfig}
                        imgData={item.image}
                      />
                    </Anchor>
                  </div>
                  <div className="moduleD_link">
                    <Anchor
                      withCaret
                      centered
                      className="moduleD_textlink"
                      to={item.link.url}
                      target={item.link.target}
                      title={item.link.title}
                      data-locator={`${getLocator('moduleD_textlink')}_${index + 1}`}
                    >
                      {item.link.text}
                    </Anchor>
                  </div>
                </Col>
              )
            );
          })}
      </Row>
      {singleCTAButton && (
        <Row centered>
          <Anchor href={singleCTAButton.url} target={singleCTAButton.target}>
            <Button
              buttonVariation="variable-width"
              className="moduleD_button"
              title={singleCTAButton.title}
              data-locator={getLocator('moduleD_button')}
            >
              {singleCTAButton.text}
            </Button>
          </Anchor>
        </Row>
      )}
    </Grid>
  );
};

export default errorBoundary(withStyles(ModuleD, style));
export { ModuleD as ModuleDVanilla };
