//
//  AppDelegate.swift
//  tcp
//
//  Created by Poorva Singh on 15/07/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import FBSDKLoginKit
import FBSDKShareKit
import FBSDKCoreKit



@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  var window: UIWindow?
  var bridge: RCTBridge!
  
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    ACPCore.configure(withAppId: "dae3661a4c63/7bc47440747f/launch-8ca67ecb0da6-development");
    ACPCore.setWrapperType(ACPMobileWrapperType.reactNative)
    ACPIdentity.registerExtension()
    ACPLifecycle.registerExtension()
    ACPSignal.registerExtension()
  
    // Get current app environment from info.plist and send it as initial property to react-native code
    var props: [String: Any]? = nil
    if let appName = Bundle.main.infoDictionary?["AppType"] {
      props = ["appType": appName]
    }
        
    // Override point for customization after application launch.
    guard let jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil) else {
      return false
    }
    
    let rootView = RCTRootView(bundleURL:jsCodeLocation, moduleName: "mobileapp", initialProperties: props, launchOptions:launchOptions)
    self.bridge = rootView?.bridge
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    
    rootViewController.view = rootView
    
    self.window!.rootViewController = rootViewController;
    self.window!.makeKeyAndVisible()
    FBSDKApplicationDelegate.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions)
    return true
    
  }
  
  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return FBSDKApplicationDelegate.sharedInstance().application(app, open: url, options: options)
  }
  
}
