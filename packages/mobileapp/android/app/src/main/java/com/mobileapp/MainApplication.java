package com.mobileapp;

import android.app.Application;

import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.facebook.soloader.SoLoader;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactInstanceManager;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.google.firebase.FirebaseApp;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.ReactInstanceHolder;


import com.facebook.reactnative.androidsdk.FBSDKPackage;


import java.lang.reflect.InvocationTargetException;
import java.util.List;

// import com.microsoft.codepush.react.CodePush;



public class MainApplication extends Application implements ReactApplication {

  private ReactInstanceHolder instanceHolder = new ReactInstanceHolder() {
    @Override
    public ReactInstanceManager getReactInstanceManager() {
      return mReactNativeHost.getReactInstanceManager();
    }
  };


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {




      @Override
      protected String getJSBundleFile(){
        return CodePush.getJSBundleFile();
      }

      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example
          // packages.add(new FBSDKPackage());
          packages.add(new VenmoPackage());
          packages.add(new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), MainApplication.this, BuildConfig.DEBUG));
          packages.add(new RNFirebaseMessagingPackage());
          packages.add(new RNFirebaseNotificationsPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
//    CodePush.setReactInstanceHolder(instanceHolder);
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    FirebaseApp.initializeApp(this);
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
