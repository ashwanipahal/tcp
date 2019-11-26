//
//  VenmoPayment.swift
//  mobileapp
//
//  Created by Vinod Pandey on 14/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//


@objc(VenmoPayment)class VenmoPayment:NSObject {

  /// Variables
  var venmoDriver : BTVenmoDriver?
  var apiClient : BTAPIClient!

  /// Function used for Venmo initialize
  ///
  /// - Parameter client_authorization: client_authorization key
  @objc func initialize(_ client_authorization: String!) {
    self.apiClient = BTAPIClient(authorization: client_authorization)
    self.venmoDriver = BTVenmoDriver(apiClient: self.apiClient)
  }

  /// Function used to check isVenmoInstalled
  ///
  /// - Parameter resolve: call back status
  @objc func isVenmoInstalled(_ resolve: RCTResponseSenderBlock)  {
    let check = self.venmoDriver?.isiOSAppAvailableForAppSwitch() ?? false
    resolve(["\(check)"])
  }

  /// Function used to authorizeVenmoAccount
  ///
  /// - Parameters:
  ///   - resolve: sucess call back
  @objc func authorizeVenmoAccount(_ resolve: @escaping RCTResponseSenderBlock)  {
    self.venmoDriver?.authorizeAccountAndVault(false, completion: { (venmoAccount, error) in

      var result = [String: Any]()
      let deviceData = PPDataCollector.collectPayPalDeviceData();
      var deviceDataString :String?
      let deviceDataError = "No device data found"
      if let data = deviceData.data(using: .utf8) {
        do {
          let dictonary =  try JSONSerialization.jsonObject(with: data, options: []) as? [String:AnyObject]
          if let myDict = dictonary {
            deviceDataString = myDict["correlation_id"] as? String
          }
        } catch _ as NSError {
           resolve(["", deviceDataError])
        }
      } else {
         resolve(["", deviceDataError])
      }
      
      result["deviceData"] = deviceDataString
      result["error"] = error
      result["nonce"] = venmoAccount?.nonce
      result["username"] = venmoAccount?.username
      result["type"] = "VenmoAccount"

      guard let _ = venmoAccount else {
        if let error = (error as NSError?) {
          resolve(["", error])
        }else{
          resolve(["", error ?? ""])
        }
        return
      }
      resolve([result, ""])
      // You got a Venmo nonce!

    })
  }

  /// Method to handle mainque
  ///
  /// - Returns: status
  @objc static func requiresMainQueueSetup() -> Bool {
    return false

  }
}
