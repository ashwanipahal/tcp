package com.mobileapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.cardio.RNCardIOPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.christopherdro.RNPrint.RNPrintPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.oblador.keychain.KeychainPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new TwitterSigninPackage(),
            new RNCardIOPackage(),
            new RNViewShotPackage(),
            new RNPrintPackage(),
            new CookieManagerPackage(),
            new ReactNativeConfigPackage(),
            new FingerprintAuthPackage(),
            new KeychainPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(),
            new VectorIconsPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNGestureHandlerPackage());
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
  }
}
