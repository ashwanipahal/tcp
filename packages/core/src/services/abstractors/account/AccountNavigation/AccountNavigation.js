import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for ModuleD related components
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },

  hrefUrl:(url) => {
    let hrefUrlVal = '';
    const res = url.split("/");
      hrefUrlVal = `/${res[1]}`;
      if(res.length > 2){
        for(let i = 2; i < res.length; i += 1){
          const resVal = res[i];
          if(i===2){
            hrefUrlVal = `${hrefUrlVal}?id=${resVal}`;
          }else{
            hrefUrlVal = `${hrefUrlVal}&${resVal}`;
          }
        }
      }
      return hrefUrlVal;
  },

  MakeComponent:(title) => {
    const res = title.split("-");
    let [ComponentVal] = res[0];
      if(res.length > 1){
        for(let i = 1 ; i < res.length; i += 1){
          const resVal = res[i];
          ComponentVal = ComponentVal + resVal.charAt(0).toUpperCase() + resVal.slice(1);
        }
      }
      return ComponentVal;
  },

  processData: data => {
    try {
        const accountNavData = data.accountNavigation;
        const navData = [];
        for (const nav of accountNavData) {
          if(nav){
            const subSections = [];
            if(nav.subSections){
              const subItem = nav.subSections;
              for (let i = 0; i < subItem.length; i += 1) {
                const hrefValue = Abstractor.hrefUrl(subItem[i].leafLink.url);
                const MenuId = Abstractor.MakeComponent(subItem[i].leafLink.title);
                subSections.push({
                  id : MenuId,
                  url: subItem[i].leafLink.url,
                  displayName: subItem[i].leafLink.text,
                  component: MenuId,
                  href:hrefValue,
                });
              }
            }

            if(nav.leafLink){
              const item = nav.leafLink;
              const hrefValue = Abstractor.hrefUrl(item.url);
              const MenuId = Abstractor.MakeComponent(item.title);
              const menu = {
                id : MenuId,
                url: item.url,
                displayName: item.text,
                component: MenuId,
                href:hrefValue,
                subSections: subSections
              };
              navData.push(menu);
          }
          }
        }
      return navData
    } catch (e) {
      return {
        data: [],
      };
    }
  },
};
export default Abstractor;
