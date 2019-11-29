package com.mobileapp;

import android.content.Context;

import com.urbanairship.AirshipConfigOptions;
import com.urbanairship.Autopilot;
import com.urbanairship.UAirship;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

public class UrbanairshipAutoPilot extends Autopilot {

    @Override
    public void onAirshipReady(@NonNull UAirship airship) {
        airship.getPushManager().setUserNotificationsEnabled(true);
    }

    @Nullable
    @Override
    public AirshipConfigOptions createAirshipConfigOptions(@NonNull Context context) {
        AirshipConfigOptions.Builder options = new AirshipConfigOptions.Builder();

        options.applyDefaultProperties(context)
                .setInProduction(!BuildConfig.DEBUG)
                .setNotificationAccentColor(ContextCompat.getColor(context, R.color.colorAccent))
                .setNotificationIcon(R.drawable.ic_launcher);

        if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.GYMBOREE_INT)) {
            options.setDevelopmentAppKey(AppConstants.DEV_GYMBOREE_INT_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_GYMBOREE_INT_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_GYMBOREE_INT_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_GYMBOREE_INT_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.TCP_INT)) {
            options.setDevelopmentAppKey(AppConstants.DEV_TCP_INT_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_TCP_INT_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_TCP_INT_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_TCP_INT_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.GYMBOREE_DEV)) {
            options.setDevelopmentAppKey(AppConstants.DEV_GYMBOREE_DEV_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_GYMBOREE_DEV_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_GYMBOREE_DEV_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_GYMBOREE_DEV_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.TCP_DEV)) {
            options.setDevelopmentAppKey(AppConstants.DEV_TCP_DEV_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_TCP_DEV_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_TCP_DEV_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_TCP_DEV_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.GYMBOREE_PREVIEW)) {
            options.setDevelopmentAppKey(AppConstants.DEV_GYMBOREE_PREVIEW_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_GYMBOREE_PREVIEW_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_GYMBOREE_PREVIEW_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_GYMBOREE_PREVIEW_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.TCP_PREVIEW)) {
            options.setDevelopmentAppKey(AppConstants.DEV_TCP_PREVIEW_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_TCP_PREVIEW_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_TCP_PREVIEW_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_TCP_PREVIEW_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.GYMBOREE_UAT)) {
            options.setDevelopmentAppKey(AppConstants.DEV_GYMBOREE_UAT_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_GYMBOREE_UAT_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_GYMBOREE_UAT_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_GYMBOREE_UAT_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.TCP_UAT)) {
            options.setDevelopmentAppKey(AppConstants.DEV_TCP_UAT_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_TCP_UAT_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_TCP_UAT_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_TCP_UAT_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.TCP_PROD)) {
            options.setDevelopmentAppKey(AppConstants.DEV_TCP_PROD_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_TCP_PROD_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_TCP_PROD_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_TCP_PROD_SECRET_KEY);
        } else if (BuildConfig.FLAVOR.equals(AppConstants.BuildFlavour.GYMBOREE_PROD)) {
            options.setDevelopmentAppKey(AppConstants.DEV_GYMBOREE_PROD_APP_KEY)
                    .setDevelopmentAppSecret(AppConstants.DEV_GYMBOREE_PROD_SECRET_KEY)
                    .setProductionAppKey(AppConstants.PROD_GYMBOREE_PROD_APP_KEY)
                    .setProductionAppSecret(AppConstants.PROD_GYMBOREE_PROD_SECRET_KEY);
        }
        return options.build();
    }
}
