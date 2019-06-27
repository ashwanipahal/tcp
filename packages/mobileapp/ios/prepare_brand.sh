#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# echo $DIR
DIR=$DIR/..
if [ "$1" != "" ]; then
	brand=$1
else
	brand="main"
fi

if [ ! -d "$DIR/brand_config/$brand/" ]; then
  # Control will enter here if $DIRECTORY exists.
  echo "#### Brand specified does not exists ####"
  echo "$DIR/brand_config/$brand/"
  exit
fi

# !!! this is very important for setting the right environment variables
if [ "${CONFIGURATION}" == "Staging" ] || [ "${CONFIGURATION}" == "Staging Debug" ]; then
  echo "STAGING"
  echo "brand_config/$brand/.env.staging" > /tmp/envfile
elif [ "${CONFIGURATION}" == "Release" ] || [ "${CONFIGURATION}" == "Debug" ]; then
  echo "PROD"
  echo "brand_config/$brand/.env.prod" > /tmp/envfile
else
  echo "STAGING"
  echo "brand_config/$brand/.env.staging" > /tmp/envfile
fi

# copy the right image files to the right icon set
source=$DIR/brand_config/$brand/ios/AppIcon.appiconset/*
destination=$DIR/ios/TCP/Images.xcassets/"AppIcon.appiconset"
rm -rf $destination/*
mkdir -p $destination
cp -Rf $source $destination

# copy the right launch screen image files to the right launch image set
sourceL=$DIR/brand_config/$brand/ios/LaunchImage.launchimage/*
destinationL=$DIR/ios/TCP/Images.xcassets/"LaunchImage.launchimage"
rm -rf $destinationL/*
mkdir -p $destinationL
cp -Rf $sourceL $destinationL

echo "Pre-build has executed successfully!"
