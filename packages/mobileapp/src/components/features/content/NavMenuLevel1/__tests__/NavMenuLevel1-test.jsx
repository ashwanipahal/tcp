import React from 'react';
import { shallow } from 'enzyme';

import NavMenuLevel1View from '../views/NavMenuLevel1.view';

describe('NavMenuLevel1', () => {
  it('should be defined', () => {
    expect(NavMenuLevel1View).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      navigationMenuObj: {
        data: {
          navigation: {
            nav: [
              {
                categoryContent: {
                  isUnique: true,
                  isShortImage: false,
                  longDescription:
                    '<div class="body-copy"> <h1>Girls Clothes</h1> <p>When it comes to the latest trends, we&rsquo;re the PLACE for her favorite styles. Dress her up in fashion with our collections of cute girls&rsquo; clothes. Shopping for your <a href="/shop/us/search/baby-clothes/baby-girls-clothes">baby</a>, <a href="/shop/us/c/toddler-girl-clothes">toddler</a>, or big girl? You&rsquo;ll find trending fashions everyone will love at great prices! &nbsp;She&rsquo;ll never get bored of our outfit choices&hellip; whether she&rsquo;s dressed up in the freshest prints and colors, or keeping it simple for a comfortable, more relaxed look. No matter where her day takes her, you can choose from a variety of looks, including:</p> <p>Fashionable, modern <a href="/shop/us/search/girls-clothing/girls-dresses">dresses</a>. It doesn&rsquo;t matter if she&rsquo;s a baby or a tween, a cute dress is a must-have in any girls&rsquo; wardrobe! Browse our adorable looks that are not only comfortable, but also make a statement. From long-sleeve to sleeveless, pleats to lace, you&rsquo;ll love our pretty collection of dresses. Need something for school? We&rsquo;ve got <a href="/shop/us/search/girls-clothing/girls-clothing-school-uniforms-dresses-and-jumpers">uniform dresses</a> for girls, too. Whether she&rsquo;s looking for a comfortable knit dress or a fashionable woven dress, she&rsquo;ll want to give them all a twirl!</p> <div class="read-more-target"> <p><a href="/shop/us/search/girls-clothing/girls-tops-girls-shirts">Tops</a> with attitude. From basic solids, to vibrant prints, vivid solids to graphic tees, these trendy shirts come in every style. From cold-shoulder sleeves to long sleeves to no sleeves at all, each is designed to stay comfy and stylish throughout the day. Have her look make a statement in one of our glitter graphic tees. When it comes to embellished tops, we&rsquo;re all about the tiny details. Shopping for a dressier occasion? Our woven tops are the perfect fit. Pair them with our wear-anywhere bottoms for a customized look.</p> <p>Skirts, pants, skorts and shorts, oh my! For the perfect look, we always start bottom-up! Complete any look with adorable <a href="/shop/us/search/girls-clothing/girls-bottoms-girls-pants">bottoms</a> from The Children&rsquo;s Place. From twirl-tally cute &nbsp;skirts in a variety of prints, to skorts and shorts that&rsquo;ll take her comfortably through playtime, you&rsquo;ll find denim and cotton blends in pull-on and snap-up styles that look as great as they feel.</p><p>No matter what styles she loves, you&rsquo;ll find the right fit every time with our easy-to-follow <a href=/shop/us/content/size-chart">size chart</a> and available <a href="/shop/us/search/girls-clothing/girls-special-sizes">extended sizes</a>. Versatile and stylish, our girls clothes from The Children&rsquo;s Place have all the essentials she needs to look great for any occasion, whether it&rsquo;s a day in the park, a special occasion, or a night with her squad. Don&rsquo;t forget the <a href="/shop/us/search/girls-clothing/girl-accessories">accessories</a> to complete her look! Add-on the perfect <a href="/shop/us/search/girls-clothing/girl-accessories-necklaces-and-sets">jewelry</a>, <a href="/shop/us/search/girls-clothing/girl-accessories-bags">bags</a>, <a href="/shop/us/search/girls-clothing/girls-shoes">shoes</a> and more; &nbsp;find more trending fashions and styles at <a href="/shop/us/home">The Children&rsquo;s Place</a>.</p> </div></div>',
                  productCount: 1853,
                  description: 'Sizes 4-14',
                  groupIdentifier: '',
                  name: 'Girl',
                  id: '47511',
                  mainCategory: {
                    contentId: '47511',
                    name: 'GIRL',
                    set: [],
                    promoBadges: [],
                    categoryImages: [
                      {
                        url:
                          'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
                        alt: 'Image Alt text attribute value',
                        title: 'Image Title attribute value',
                        crop_d: 'c_crop,g_face:center,q_auto:best,w_393',
                        crop_t: 'c_crop,g_face:center,q_auto:best,w_932',
                        crop_m: 'c_crop,g_face:center,q_auto:best,w_961',
                      },
                    ],
                    sizesRanges: [
                      {
                        text: 'SIZES 4-16',
                      },
                    ],
                    categoryLayouts: [],
                  },
                },
              },
            ],
          },
        },
      },
    };
    const component = shallow(<NavMenuLevel1View {...props} />);
    expect(component).toMatchSnapshot();
  });
});
