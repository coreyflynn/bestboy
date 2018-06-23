// @flow
/* eslint no-undef: 0 */
declare type AccountPreferenceName =
  'secure_on_ingest'
  | 'application_rootcolor'
  | 'quicklink_allowdownload'
  | 'quicklink_allowfeedback'
  | 'quicklink_emailnotification'
  | 'quicklink_expiration'
  | 'quicklink_sendtype'
  | 'quicklink_playbacktype'
  | 'quicklink_emailsubject'
  | 'quicklink_emailmsg'
  | 'sso_message_login'
  | 'sso_message_button'
  | 'videoplayback_security'
  | 'contacts_full_access'
  | 'login_inactivitylocktime'
  | 'newuser_msg'
  | 'custom_knowledgebase_label'
  | 'custom_knowledgebase_url'
  | 'login_greeting'
  | 'email_from'
  | 'email_server'
  | 'email_port'
  | 'email_user'
  | 'email_pass'
  | 'use_tls'
  | 'use_ssl'
  | 'disable_ios_app'
  | 'ftpapplet_enabled'
  | 'quicklink_logo'
  | 'sso_logout'
  | 'sso_endpoint'
  | 'sso_global'
  | 'sso_type'
  | 'quicklink_blacklist'
  | 'proxy_autodetect'
  | 'proxy_socksproxyhost'
  | 'proxy_socksproxyport'
  | 'proxy_ftpproxyhost'
  | 'proxy_ftpproxyport'
  | 'proxy_useftp'
  | 'email_backgroundcolor'
  | 'email_header'
  | 'email_footer'
  | 'login_image'
  | 'viewport_header'
  | 'viewport_logo'
  | 'viewport_footer'
  | 'application_smalllogo'
  | 'application_largelogo'
  | 'email_header_2'
  | 'hostname'
  | 'account_status'
;

declare type AccountPreference = {
  id: string; // the id of the preference
  accountId: string; // the domain id
  name: string; // the name of the preference
  value: string; // the preference value
};

declare type AccountPreferences = AccountPreference[];
