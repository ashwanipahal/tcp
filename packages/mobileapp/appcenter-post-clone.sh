#!/usr/bin/env bash
touch ./yarn.lock
cd ios
sudo gem install cocoapods
pod install
