export const getBrierleySwitch = state => {
  return (
    (state.session && state.session.siteDetails && state.session.siteDetails.isBrierleyEnabled) ||
    true
  );
};

export default getBrierleySwitch;
