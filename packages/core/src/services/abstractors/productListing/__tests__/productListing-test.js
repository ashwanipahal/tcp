/* eslint-disable */
/* eslint-disable extra-rules/no-commented-out-code */
import ProductListing from '../productListing';
import formattedData from './formattedData';
import {
  bindAllClassMethodsToThis,
  getSiteId,
  isClient,
  isMobileApp,
  routerPush,
} from '../../../../utils';

jest.mock('../../../handler/handler');

jest.mock('../../../../utils', () => ({
  bindAllClassMethodsToThis: jest.fn(),
  getSiteId: jest.fn(),
  isClient: jest.fn(),
  isMobileApp: jest.fn(),
  routerPush: jest.fn(),
}));

describe('product Listing', () => {
  it('should get the PLP products', () => {
    routerPush.mockImplementation(() => false);
    getSiteId.mockImplementation(() => 'us');
    bindAllClassMethodsToThis.mockImplementation(() => '');
    getSiteId.mockImplementation(() => 'us');
    isClient.mockImplementation(() => false);
    isMobileApp.mockImplementation(() => false);

    const productListingInstance = new ProductListing();
    return productListingInstance
      .getProducts(
        {
          seoKeywordOrCategoryIdOrSearchTerm: '',
          isSearch: '',
          filtersAndSort: {},
          pageNumber: 1,
          getImgPath: '',
          categoryId: '47502>47531',
          breadCrumbs: '',
          bucketingSeqConfig: '',
          isUnbxdSequencing: '',
          excludeBadge: '',
          startProductCount: 0,
          numberOfProducts: 0,
          cacheFiltersAndCount: true,
          extraParams: {
            'facet.multilevel': 'categoryPath',
            'f.categoryPath.nameId': true,
            'f.categoryPath.max.depth': 4,
          },
          shouldApplyUnbxdLogic: true,
          getFacetSwatchImgPath: () => {},
          getImgPath: () => {
            return {
              colorSwatch: [],
              productImages: [
                {
                  500: 'abcd.jpg',
                },
              ],
            };
          },
          hasShortImage: false,
          categoryNameList: [
            {
              categoryId: '47502',
              title: 'Toddler Girl',
              longDescription:
                '<div class="body-copy"><h1>Toddler & Baby Girl Clothes</h1><p>What baby wants, baby gets (that goes for mom, too!) The Children&rsquo;s Place has just the right <strong>clothes</strong> for your little <strong>girl</strong>, whether she&rsquo;s a bubbly <strong>baby</strong> or and on-the-go <strong>toddler</strong>. Check out must-have basics, playdate-ready looks, as well as oh-so-cute dresses and accessories for those special occasions. We&rsquo;ve got it all, including:</p><div class="read-more-target"><ul><li>Everyday essentials. Whether it&rsquo;s bodysuits and basic tees, comfy shorts, tanks or sleepers, The Children&rsquo;s Place has <strong>toddler</strong> and <strong>baby clothes</strong> she needs for everyday wear. Best of all, these durable pieces stand up to lots of washes, making them the perfect hand-me-downs.</li><li>Fashion-forward <a href="/us/c/toddler-girl-jeans">denim</a>. Because they are never too young to sport this style staple! And we&rsquo;ve got all the denim jeans and washes she needs to stay looking adorable, and feeling great. Designed for life on the move, our baby and toddler denim collection has easy pull-on, pull-off style with elasticized backs for added comfort.</li><li>Odds and ends. Discover the joy of one-stopping shopping with the go-to <strong>baby</strong> and <strong>toddler</strong> accessories you need, all in one <a href="/us/home">PLACE</a>. From soft hats and star-worthy sunglasses, to socks and hair accessories, we&rsquo;ve got you covered.</li></ul><p>Check out fashionable finds on-the-go, too! Our user-friendly <a href="/us/content/mobile?icid=mbapp_glft_mbapplp_txt_070115_null">mobile app</a> lets you quickly access your coupons and rewards, check product availability, locations, hours and so much more. It&rsquo;s kids shopping made oh-so-simple with <a href="/us/content/free-shipping?icid=hp_na_f_na_073118_freeshipping">Free Shipping</a> every day, with no minimum purchase required. The Children&rsquo;s Place also offers Free Returns to any store/outlet (even for online exclusive products). Remember to check out our <a href="/us/content/buy-online">BOPIS</a> (Buy Online Pick Up In Store) service,&nbsp;too, making it easier than ever to keep your whole crew looking good (at prices you&rsquo;ll love).</p></div>',
              url: '/c?cid=toddler-girl-clothes',
            },
            {
              categoryId: '47531',
              title: 'School Uniforms',
              longDescription:
                "<div><h1>Toddler Girl School Uniforms</h1><p>Looking for the perfect toddler girl school uniforms? Shop The Children's Place and help her get ready for class!</p><div class=\"read-more-target\"><p>Check out all our school uniforms for toddler girls that include everything from tops and bottoms, to pull-on skorts, chino pants, polo dresses, jumpers, cardigans and more.</p><p>Shop and see why our girls uniform polo is the must-have everyday essential for school. Choose from classic pique and ruffle pique styles and don't forget our long-sleeve styles, too. With so many colors to choose from, you'll be able to mix and match her school wardrobe every day of the week</p><p>Complete her uniform look with tights, the perfect matching headband, jewelry and our essential everyday back-to-school accessories including backpacks, lunchboxes and water bottles.</p><p>At the Children's Place, all of our toddler girl school uniforms are designed for comfy all-day wear.</p><p>Looking for the perfect fit? We've got all the sizes she needs! Our <a href=\"https://www.childrensplace.com/us/content/size-chart\">size charts</a> make it easy to find the right fit on the styles she loves. Shop the latest trending tops for girls in store or online and get free shipping 24/7/365 at the PLACE where fashion meets fun - The Children's Place.</p></div>",
              url: '/c?cid=toddler-girl-school-uniforms',
            },
          ],
          location: {
            href: 'http://localhost:3000/us/c/toddler-girl-school-uniforms',
            ancestorOrigins: {},
            origin: 'http://localhost:3000',
            protocol: 'http:',
            host: 'localhost:3000',
            hostname: 'localhost',
            port: '3000',
            pathname: '/us/c/toddler-girl-school-uniforms',
            search: '',
            hash: '',
          },
          isFetchFiltersAndCountReq: true,
        },
        {}
      )
      .then(res => {
        expect(JSON.stringify(res)).toEqual(formattedData);
      });
  });
});
