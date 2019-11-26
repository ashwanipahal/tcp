#!/bin/bash
raygun_api_key="W1Hxa4blNaRqscJ9Y5A0Q"
dsym_path="/Users/edelman215/Projects/Clients/TCP/rwd-apps/tcp-unified-experience/packages/mobileapp/ios/build/mobileapp/Build/Products/Debug-iphonesimulator/mobileapp.app.dSYM"
app_id="1lcyu2l"
EXT_ACCESS_TOKEN="CaTVLyHXthK02mBUwpUFh8H1OWd9gTvm"

token=`echo 'michael.edelman@inveniodigital.com:jX64@i*3u78PZ-g*YcJr' | base64`

echo $token

set -e

if [ -z "$raygun_api_key" ]; then
	printf "\e[31mError: \e[0mraygun_api_key variable not set\n"
	exit 1
fi

if [ -z "$dsym_path" ]; then
	printf "\e[31mError: \e[0mdsym_path variable not set\n"
	exit 1
fi

if [ -z "$app_id" ]; then
	printf "\e[31mError: \e[0mapp_id variable not set\n"
	exit 1
fi

shopt -s nocasematch

zip_dsym_path=""
if [[ -d "${dsym_path}" ]] ; then
	printf "\e[34mZipping dSYM...\e[0m\n"
	zip_dsym_path="${dsym_path}.zip"
	zip -r "${zip_dsym_path}" "${dsym_path}"
elif [[ -f "${dsym_path}" ]]; then
	if [[ $dsym_path =~ \.zip$ ]] ; then
		zip_dsym_path="${dsym_path}"
	else
		printf "\e[31mError: \e[0mUnsupported dSYM format\n"
		exit 1
	fi
else
	printf "\e[31mError: \e[0mFile not found at path ${dsym_path}\n"
	exit 1
fi

printf "\e[34mUploading ${zip_dsym_path} to Raygun\e[0m\n"



curl -w "Upload returned: %{http_code}\\n" -F "DsymFile=@${dsym_path}" "https://app.raygun.com/dashboard/${app_id}/settings/symbols?authToken={$EXT_ACCESS_TOKEN}"