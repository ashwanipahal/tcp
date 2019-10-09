/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function checkIfNotShippingFullName
 * @description return boolean value if shippingFullname is present .
 */
const checkIfShippingFullName = ({ orderNumbersByFullfillmentCenter }) => {
  return orderNumbersByFullfillmentCenter.fullfillmentCenterMap.find(
    center => !!center.shippingFullname
  );
};

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function checkIfNotShippingFullName
 * @description return boolean value if shippingFullname is not present .
 */
const checkIfNotShippingFullName = ({ orderNumbersByFullfillmentCenter }) => {
  return orderNumbersByFullfillmentCenter.fullfillmentCenterMap.find(
    center => !center.shippingFullname
  );
};

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function checkIffullfillmentCenterMap
 * @description return boolean value if fullfillmentCenterMap is present .
 */
const checkIffullfillmentCenterMap = orderNumbersByFullfillmentCenter => {
  return orderNumbersByFullfillmentCenter && orderNumbersByFullfillmentCenter.fullfillmentCenterMap;
};

export { checkIfShippingFullName, checkIfNotShippingFullName, checkIffullfillmentCenterMap };
