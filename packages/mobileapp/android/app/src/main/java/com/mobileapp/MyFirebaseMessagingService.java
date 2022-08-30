package com.mobileapp;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.urbanairship.push.fcm.AirshipFirebaseIntegration;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String s) {
        AirshipFirebaseIntegration.processNewToken(getApplicationContext());
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        AirshipFirebaseIntegration.processMessageSync(getApplicationContext(), remoteMessage);
    }
}
