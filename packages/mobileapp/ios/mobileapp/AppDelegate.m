/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AppCenterReactNativeShared/AppCenterReactNativeShared.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <MPulse/MPulse.h>


#define MPULSE_API_KEY @"YOUR_API_KEY"



//  #if DEBUG
//  #import <FlipperKit/FlipperClient.h>
//  #import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//  #import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//  #import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//  #import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//  #import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//  #endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  NSDictionary *props = @{@"appType":launchOptions};

// Initialize the library with your
// mPulse API key, MPULSE_API_KEY
[MPulse initializeWithAPIKey:MPULSE_API_KEY];


  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"mobileapp"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [AppCenterReactNative register];
[AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
[AppCenterReactNativeCrashes registerWithAutomaticProcessing];
 
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return  [CodePush bundleURL];
#endif
}

 + (void) initializeFlipper:(UIApplication *)application
 {
//  #if DEBUG
//    FlipperClient *client = [FlipperClient sharedClient];
//    SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//    [client addPlugin: [[FlipperKitLayoutPlugin alloc] initWithRootNode: application withDescriptorMapper: layoutDescriptorMapper]];
//    [client addPlugin: [[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//    [client addPlugin: [FlipperKitReactPlugin new]];
//    [client addPlugin: [[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//    [client start];
//  #endif
 }

@end
