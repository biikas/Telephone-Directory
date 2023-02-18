#!/usr/bin/env sh
find '/usr/share/nginx/html' -name 'main-*.js' -exec sed -i -e 's,CAMPAIGN_SERVER_URL_a0e68ff9583d487e8dfklgjds45lkj53lkj3jh7,'"$CAMPAIGN_SERVER_URL_a0e68ff9583d487e8dfklgjds45lkj53lkj3jh7"',g' {} \;
nginx -g "daemon off;"