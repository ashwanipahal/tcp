//
//  VenmoPayment.m
//  mobileapp
//
//  Created by Vinod Pandey on 14/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"

/**
 Bridge handled to connect Venmo form React native
 */
@interface RCT_EXTERN_MODULE(VenmoPayment, NSObject)
RCT_EXTERN_METHOD(initialize:(NSString *)client_authorization)
RCT_EXTERN_METHOD(isVenmoInstalled:(RCTResponseSenderBlock)resolve)
RCT_EXTERN_METHOD(authorizeVenmoAccount:(RCTResponseSenderBlock)resolve)
@end
