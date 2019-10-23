package com.mobileapp;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
// import fr.greweb.reactnativeviewshot.RNViewShotPackage;
// import com.oblador.vectoricons.VectorIconsPackage;
// import com.goldenowl.twittersignin.TwitterSigninPackage;
// import com.rnfingerprint.FingerprintAuthPackage;
// import com.christopherdro.RNPrint.RNPrintPackage;
// import com.oblador.keychain.KeychainPackage;
// import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
// import com.dylanvann.fastimage.FastImageViewPackage;
// import com.learnium.RNDeviceInfo.RNDeviceInfo;
// import com.psykar.cookiemanager.CookieManagerPackage;
// import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// import com.cardio.RNCardIOPackage;
// import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
// import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
// import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
// import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.microsoft.codepush.react.ReactInstanceHolder;

import com.microsoft.codepush.react.CodePush;
// import com.reactnativecommunity.webview.RNCWebViewPackage;
// import com.reactnativecommunity.netinfo.NetInfoPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

// import com.microsoft.codepush.react.CodePush;




public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
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
          packages.add(new CodePush("spClHqj4L07OjWqQEy1iPmC4RMZ5SkveJ0SIQQ", getApplicationContext(), BuildConfig.DEBUG));
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

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this); // Remove this line if you don't want Flipper enabled
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