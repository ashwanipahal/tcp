package com.mobileapp;

import android.util.Log;

import com.braintreepayments.api.BraintreeFragment;
import com.braintreepayments.api.DataCollector;
import com.braintreepayments.api.Venmo;
import com.braintreepayments.api.interfaces.BraintreeCancelListener;
import com.braintreepayments.api.interfaces.BraintreeErrorListener;
import com.braintreepayments.api.interfaces.BraintreeListener;
import com.braintreepayments.api.interfaces.BraintreeResponseListener;
import com.braintreepayments.api.interfaces.PaymentMethodNonceCreatedListener;
import com.braintreepayments.api.models.PaymentMethodNonce;
import com.braintreepayments.api.models.VenmoAccountNonce;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.gson.Gson;


public class VenmoPayment extends ReactContextBaseJavaModule implements BraintreeErrorListener, BraintreeResponseListener, BraintreeListener, BraintreeCancelListener {

    private BraintreeFragment braintreeFragment;
    private String temporaryToken;
    private String deviceData;
    private Callback errorCallback;
    private Callback successCallback;

    public VenmoPayment(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @ReactMethod
    public void initialize(final String args) {
        // Obtain the arguments.
        temporaryToken = args;
    }


    @ReactMethod
    public void authorizeVenmoAccount(Callback errorCallbackArgs, Callback successCallbackArgs) {

        try {
            errorCallback = errorCallbackArgs;
            successCallback = successCallbackArgs;
            braintreeFragment = BraintreeFragment.newInstance(this.getCurrentActivity(), temporaryToken);
            if (temporaryToken == null || braintreeFragment == null || errorCallback == null || successCallback == null) {
                //Error: "The Braintree client must first be initialized via BraintreePlugin.initialize(token)"
                errorCallback.invoke("The Braintree client must first be initialized via BraintreePlugin.initialize(token)");
                return;
            }

            braintreeFragment.addListener(new BraintreeErrorListener() {
                @Override
                public void onError(Exception error) {
                    //  " Authenticating BraintreeErrorListener: " + error.toString());
                    errorCallback.invoke(error.getMessage());

                }
            });
            braintreeFragment.addListener(new PaymentMethodNonceCreatedListener() {
                @Override
                public void onPaymentMethodNonceCreated(PaymentMethodNonce paymentMethodNonce) {
                    // " Authenticating PaymentMethodNonceCreatedListener: " + paymentMethodNonce.getNonce());


                    DataCollector.collectDeviceData(braintreeFragment, new BraintreeResponseListener<String>() {
                        @Override
                        public void onResponse(String s) {
                            Gson g = new Gson();
                            VenmoDeviceData vData = g.fromJson(s, VenmoDeviceData.class);
                            deviceData = vData.getCorrelation_id();
                            Log.e("device data", deviceData);
                        }
                    });
                    VenmoData venmoData = new VenmoData();
                    venmoData.setDeviceData(deviceData);
                    venmoData.setError("null");
                    venmoData.setNonce(paymentMethodNonce.getNonce());
                    venmoData.setType("VenmoAccount");
                    venmoData.setUsername(paymentMethodNonce.getDescription());


                    Gson gsonVenmo = new Gson();
                    String venmoDataString = gsonVenmo.toJson(venmoData);
                    Log.e("venmo data", venmoDataString);

                    successCallback.invoke(venmoDataString);

                }
            });


            if (!Venmo.isVenmoInstalled(this.getReactApplicationContext())) {
                Log.e("VENMO_ACTION", "The Braintree client must be installed for authorization");
                //Error:"The Braintree client must be installed for authorization"
                errorCallback.invoke("The Braintree client must be installed for authorization");
                return;
            }
            // Async function for authorization
            Venmo.authorizeAccount(braintreeFragment, false);
        } catch (Exception e) {
            // There was an issue with your authorization string.
            errorCallback.invoke("Error creating Authenticating interface: " + e.getMessage());
        }
    }


    @ReactMethod
    public void isVenmoInstalledOnDevice(Callback booleanCallback) {
        if (Venmo.class != null) {
            booleanCallback.invoke(Venmo.isVenmoInstalled(this.getReactApplicationContext()));
        }else{
            booleanCallback.invoke(false);
        }
    }


    @ReactMethod
    public void openPlayStoreForVenmoAppInstallation() {
        if (Venmo.class != null) {
            Venmo.openVenmoAppPageInGooglePlay(this.braintreeFragment);
        }
    }


    @Override
    public String getName() {
        return "VenmoPayment";
    }

    @Override
    public void onError(Exception error) {
        //"Caught error from BraintreeSDK: " + error.getMessage()
        if (errorCallback != null)
            errorCallback.invoke("BraintreePlugin uncaught exception: " + error.getMessage());

    }

    @Override
    public void onResponse(Object deviceDataArgs) {
        //"response from BraintreeSDK: "
        deviceData = (String) deviceDataArgs;
        Log.e("device data", deviceData);
    }


    @Override
    public void onCancel(int requestCode) {
        //"cancel from BraintreeSDK: "
        if (errorCallback != null)
            errorCallback.invoke(" Payment is cancelled ");
    }
}
