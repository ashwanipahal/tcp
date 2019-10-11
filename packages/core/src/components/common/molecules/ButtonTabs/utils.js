/**
 * @constant getActiveStatus
 * @params - id - id of iteratable button tabs
 *           selectedTabId - id of selected tab from buttonTabs
 *
 * @description -  gives status of activeness of button.
 */
const getActiveStatus = (id, selectedTabId = []) => {
  const selectedTab = Array.isArray(selectedTabId)
    ? selectedTabId && selectedTabId[0]
    : selectedTabId;
  if (Array.isArray(id) && JSON.stringify(id) === JSON.stringify(selectedTabId)) {
    return true;
  }
  if (id === selectedTab) {
    return true;
  }
  return false;
};

export default getActiveStatus;
