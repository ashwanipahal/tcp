/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <AppCenter/MSAppCenter.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AppCenterReactNativeShared/AppCenterReactNativeShared.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <MPulse/MPulse.h>
//#import <raygun4apple/raygun4apple_iOS.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import "BraintreeCore.h"


#define MPULSE_API_KEY @"APZRQ-P5BYB-9WHCK-VARZB-JGTU7"

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
  
  // Start Init of 3P Modules/Services
  
  // ********************************
  // RAYGUN (Error Reporting)
  // ********************************
//  RaygunClient *rgClient = [RaygunClient sharedInstanceWithApiKey:@"W1Hxa4blNaRqscJ9Y5A0Q"];
//  [rgClient enableCrashReporting];
//  NSException *exception = [NSException exceptionWithName:@"TestException" reason:@"Something went wrong" userInfo:nil];
//  [RaygunClient.sharedInstance sendException:exception withTags:@[@"CustomTag1", @"CustomTag2"]];
  //  [rgClient enableRealUserMonitoring];
  //  [RaygunClient.sharedInstance enableNetworkPerformanceMonitoring];
  
  
  // ********************************
  // mPULSE (Performance Monitoring)
  // ********************************
  [MPulse initializeWithAPIKey:MPULSE_API_KEY];
  
  
  // ********************************
  // AppCenter
  // ********************************
  [MSAppCenter setLogLevel: MSLogLevelVerbose];
    [AppCenterReactNative register];
    [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
    [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  // ********************************
  // Facebook
  // ********************************
    [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];




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
 [BTAppSwitch setReturnURLScheme:@"com.childrensplace.tcp-ios.payments"];
 //[self performSelector:@selector(crashMethod) withObject:nil afterDelay:3.0 ];
 
  return YES;
}
//-(void)crashMethod {
//   @throw NSInternalInconsistencyException;
//}
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

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  if ([url.scheme localizedCaseInsensitiveCompare:@"com.childrensplace.tcp-ios.payments"] == NSOrderedSame) {
    return [BTAppSwitch handleOpenURL:url options:options];
  }
  
  BOOL handled =  [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options];
  // Add any custom logic here.
  return handled;
}

// If you support iOS 8, add the following method.
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  if ([url.scheme localizedCaseInsensitiveCompare:@"com.childrensplace.tcp-ios.payments"] == NSOrderedSame) {
    return [BTAppSwitch handleOpenURL:url sourceApplication:sourceApplication];
  }
  return NO;
}

@end
