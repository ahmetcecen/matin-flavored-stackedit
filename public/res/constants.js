define([], function() {
	var constants = {};
	constants.VERSION = "4.3.11";
	constants.MAIN_URL = "https://matin-flavored-stackedit.herokuapp.com/"; 
	constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-65639202-1";
	constants.GOOGLE_API_KEY = "AIzaSyAWRIP30sewotZNcQylIu8UUthPLGX08QY"; 
	constants.GOOGLE_DRIVE_APP_ID = "6661919703";	
	constants.BASE_URL = "https://matin-flavored-stackedit.herokuapp.com/";
	constants.GOOGLE_CLIENT_ID = '6661919703-bq691f2tjn546b7j7g7dlv5tp2dekjc5.apps.googleusercontent.com';
	constants.GITHUB_CLIENT_ID = '2cc69abccac77a6fe816';
	constants.GATEKEEPER_URL = "https://mfs-gatekeeper.herokuapp.com/";

	// No Need to Edit Below
	constants.DROPBOX_APP_KEY = "lq6mwopab8wskas";
	constants.DROPBOX_APP_SECRET = "851fgnucpezy84t";
	constants.DROPBOX_RESTRICTED_APP_KEY = "sw0hlixhr8q1xk0";
	constants.DROPBOX_RESTRICTED_APP_SECRET = "1r808p2xygs6lbg";
	constants.BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c";
	constants.DEFAULT_FILE_TITLE = "Title";
	constants.DEFAULT_FOLDER_NAME = "New folder";
	constants.GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document";
	constants.EDITOR_DEFAULT_PADDING = 35;
	constants.CHECK_ONLINE_PERIOD = 120000;
	constants.AJAX_TIMEOUT = 30000;
	constants.ASYNC_TASK_DEFAULT_TIMEOUT = 60000;
	constants.ASYNC_TASK_LONG_TIMEOUT = 180000;
	constants.USER_IDLE_THRESHOLD = 300000;
	constants.IMPORT_FILE_MAX_CONTENT_SIZE = 100000;
	constants.IMPORT_IMG_MAX_CONTENT_SIZE = 10000000;
	constants.COUCHDB_PAGE_SIZE = 25;
	constants.TEMPORARY_FILE_INDEX = "file.tempIndex";
	constants.WELCOME_DOCUMENT_TITLE = "Hello!";
	constants.DOWNLOAD_IMPORT_URL = "/downloadImport";
	constants.PICASA_IMPORT_IMG_URL = "/picasaImportImg";
	constants.SSH_PUBLISH_URL = '/sshPublish';
	constants.PDF_EXPORT_URL = "/pdfExport";
	constants.COUCHDB_URL = 'https://stackedit.smileupps.com/documents';

	if(location.hostname.indexOf("stackedit.io") === 0) {
		constants.BASE_URL = constants.MAIN_URL;
		constants.GOOGLE_CLIENT_ID = '241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '710fc67886ab1ae8fee6';
		constants.GATEKEEPER_URL = "https://stackedit-io-gatekeeper.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://stackedit-io-tumblr-proxy.herokuapp.com/";
	}
	else if(location.hostname.indexOf("benweet.github.io") === 0) {
		constants.BASE_URL = 'http://benweet.github.io/stackedit/';
		constants.GOOGLE_CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = 'fa0d09514da8377ee32e';
		constants.GATEKEEPER_URL = "https://stackedit-gatekeeper.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '3185';
		constants.WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/";
	}

	constants.THEME_LIST = {
		"blue": "Blue",
		"default": "Default",
		"gray": "Gray",
		"night": "Night",
		"school": "School",
		"solarized-light": "Solarized Light",
		"solarized-dark": "Solarized Dark"
	};

	return constants;
});
