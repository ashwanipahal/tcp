import React from 'react'; //eslint-disable-line
import MyAccountDropdownNav from './MyAccountDropdownNav.view.native';
import { ParentContainer } from '../styles/MyAccountLayout.style.native';
// @flow
type Props = {
  navData: Array<Object>,
  mainContent: Function,
  handleComponentChange: Function,
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of drop down
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the drop down nav as config object
 * @param {mainContent} mainContent The component to be rendered on the below side
 */

const MyAccountLayoutView = ({
  navData,
  mainContent: MainContent,
  handleComponentChange,
}: Props) => {
  return (
    <ParentContainer>
      <MyAccountDropdownNav navData={navData} handleComponentChange={handleComponentChange} />
      <MainContent />
    </ParentContainer>
  );
};

export default MyAccountLayoutView;
