#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# echo $DIR
DIR=$DIR/..
if [ "$1" != "" ]; then
	brand=$1
else
    # default tenant if none is specified
	brand="main"
fi

if [ ! -d "$DIR/brand_config/$brand/" ]; then
  # Check if $DIRECTORY exists and throw exeption if it doesn't .
  echo "#### Specified Brand does not exists ####"
  exit
fi

# copy the right image files to the
source=$DIR/brand_config/$brand/android/res/
destination=$DIR/android/app/src/main/res/

rm -rf $destination/*

cp -Rf $source $destination

echo "Pre-build has executed successfully!"
