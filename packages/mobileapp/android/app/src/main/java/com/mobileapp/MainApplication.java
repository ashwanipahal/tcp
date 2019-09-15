package com.mobileapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
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

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNPrintPackage(),
            new CookieManagerPackage(),
            new ReactNativeConfigPackage(),
            new FingerprintAuthPackage(),
            new KeychainPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(), new VectorIconsPackage(),
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
