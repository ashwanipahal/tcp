const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {

    contentId
    name
    type
    set {
      val
      key
    }
    errorMessage
    composites {
     headerText {
       textItems {
         text
         style
       }

       icon {
         placement
         icon
       }

       link {
         url
         text
         title
         target
       }
     }
     promoBanner {
         link {
           url
           title
         }
         textItems {
           text
           style
         }
       }

     linkedImage {
       link {
         url
         text
         title
         target
       }

       image {
         url
         alt
         crop_d
         crop_t
         crop_m
       }
     }
     divTabs {
         text {
           text
         }
         category {
           key
           val
         }

         singleCTAButton {
           url
           text
           target
           title
         }
     }
  }

 }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
