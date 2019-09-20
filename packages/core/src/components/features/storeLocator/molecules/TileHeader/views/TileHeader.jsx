import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Row, Col, Anchor, BodyCopy } from '../../../../../common/atoms';
import style from '../styles/TileHeader.style.js';
import { toTimeString } from '../../../../../../utils';
import { parseDate } from '../../../../../../utils/parseDate';
import googleMapConfig from '../../../../../../config/googleMapConstants.config';

const createOpenTimingsView = (labels, storeHours) => {
  const todaysDate = new Date();
  const { regularHours, holidayHours, regularAndHolidayHours } = storeHours;
  const selectedInterval = [...regularHours, ...holidayHours, ...regularAndHolidayHours].filter(
    hour => {
      const toInterval = hour.openIntervals[0] && hour.openIntervals[0].toHour;
      return (
        parseDate(toInterval).getDate() === todaysDate.getDate() &&
        parseDate(toInterval).getMonth() === todaysDate.getMonth() &&
        parseDate(toInterval).getFullYear() === todaysDate.getFullYear()
      );
    }
  );
  const timeString = toTimeString(parseDate(selectedInterval[0].openIntervals[0].toHour), true);

  return (
    <BodyCopy
      fontSize="fs12"
      component="div"
      color="text.primary"
      fontFamily="secondary"
      fontWeight="normal"
    >
      {`(${labels.lbl_storelocators_landingpage_openInterval} ${timeString})`}
    </BodyCopy>
  );
};

const generateMapDirectionUrl = address => {
  let params = '';
  const addressKeys = Object.keys(address);
  addressKeys.forEach((key, ind) => {
    params += `${address[key]}${ind + 1 === addressKeys.length ? '' : ',%20'}`;
  });

  return `${googleMapConfig.MAP_DIRECTION_URL}${params}`;
};

const TileHeader = props => {
  const { storeIndex, store, labels, className } = props;
  const { distance, basicInfo, hours } = store;
  const {
    storeName,
    coordinates,
    address: { addressLine1, city, state, zipCode },
  } = basicInfo;
  const storeNameCaps = storeName.toUpperCase();

  return (
    <div className={className}>
      <Row fullBleed>
        <Col colSize={{ large: 3, medium: 4, small: 3 }}>
          <BodyCopy
            fontSize="fs14"
            component="div"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="semibold"
          >
            {`${storeIndex}. ${storeNameCaps}`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 2, medium: 4, small: 3 }}>
          {createOpenTimingsView(labels, hours)}
        </Col>
        <Col colSize={{ large: 2, medium: 4, small: 3 }}>
          <BodyCopy
            fontSize="fs12"
            component="div"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="normal"
            className="tileheader__body"
          >
            {`${distance} ${labels.lbl_storelocators_landingpage_milesAway}`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <Anchor
            fontSizeVariation="medium"
            underline
            href={generateMapDirectionUrl({ addressLine1, city, state, zipCode })}
            anchorVariation="primary"
            dataLocator="get__directions"
            target="_blank"
            className=" get__directions__link"
          >
            {labels.lbl_storelocators_landingpage_getdirections_link}
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};

TileHeader.propTypes = {};

TileHeader.defaultProps = {
  children: null,
};

export default withStyles(TileHeader, style);
