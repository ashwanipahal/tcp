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
    var hrefUrlVal = '';
    var res = url.split("/");
      hrefUrlVal = '/'+res[1];
      if(res.length > 2){
        for(let i=2;i<res.length;i++){
          var resVal = res[i];
          if(i==2){
            hrefUrlVal = hrefUrlVal +'?id=' + resVal
          }else{
            hrefUrlVal = hrefUrlVal + '&' + resVal
          }
        }
      }
      return hrefUrlVal;
  },

  MakeComponent:(title) => {
    var ComponentVal = '';
    var res = title.split("-");
    ComponentVal = res[0];
      if(res.length > 1){
        for(let i=1;i<res.length;i++){
          var resVal = res[i];
          ComponentVal = ComponentVal + resVal.charAt(0).toUpperCase() + resVal.slice(1);
        }
      }
      return ComponentVal;
  },

  processData: data => {
    try {
          const accountNavData = data.accountNavigation;
          const navData = []
        for(var nav of accountNavData) {
          if(nav){
            let subSections = [];
            if(nav.subSections){
              let subItem = nav.subSections;
              for (var i = 0; i < subItem.length; i++) {
                console.log(subItem[i]);
                console.log(subItem[i].leafLink.url);
                let hrefValue = Abstractor.hrefUrl(subItem[i].leafLink.url);
                let MenuComponent = Abstractor.MakeComponent(subItem[i].leafLink.title);
                subSections.push({
                  id : MenuComponent,
                  url: subItem[i].leafLink.url,
                  displayName: subItem[i].leafLink.text,
                  component: MenuComponent,
                  href:hrefValue,
                });
              }
            }
            if(nav.leafLink){
              let item = nav.leafLink;
              let hrefValue = Abstractor.hrefUrl(item.url);
              let MenuComponent = Abstractor.MakeComponent(item.title);
              var menu = {
                id : MenuComponent,
                url: item.url,
                displayName: item.text,
                component: MenuComponent,
                href:hrefValue,
                subSections: subSections
              };
          }
            navData.push(menu);
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
