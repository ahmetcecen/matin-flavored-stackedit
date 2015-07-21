define([
	"utils",
	"classes/Provider",
	"settings",
	"helpers/githubHelper"
], function(utils, Provider, settings, githubHelper) {

     function getToday() {
         var today = new Date();
         var dd = today.getDate();
             dd = (dd<10) ? '0' + dd : dd;
         var mm = today.getMonth() + 1;
             mm = (mm<10) ? '0' + mm : mm;
         var yyyy = today.getFullYear();				 
			 
         return yyyy+'-'+mm+'-'+dd+'-';
     } 	

	var githubProvider = new Provider("github", "GitHub");
	githubProvider.publishPreferencesInputIds = [
		"github-repo",
		"github-branch"
	];

	githubProvider.getPublishLocationLink = function(attributes) {
		var result = [
			'https://github.com',
			attributes.username,
			attributes.repository,
			'blob',
			attributes.branch
		];
		return result.concat(attributes.path.split('/').map(encodeURIComponent)).join('/');
	};

	githubProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
		var commitMsg = settings.commitMsg;
		githubHelper.upload(publishAttributes.repository, publishAttributes.username, publishAttributes.branch, publishAttributes.path, content, commitMsg, function(err, username) {
			publishAttributes.username = username;
			callback(err);
		});
	};

	githubProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.repository = utils.getInputTextValue("#input-publish-github-repo", event);
		publishAttributes.branch = utils.getInputTextValue("#input-publish-github-branch", event);
		publishAttributes.path = '_posts/'+getToday()+utils.getInputTextValue("#input-publish-file-path", event);
		if(event.isPropagationStopped()) {
			return undefined;
		}
		var parsedRepository = publishAttributes.repository.match(/[\/:]?([^\/:]+)\/([^\/]+?)(?:\.git)?$/);
		if(parsedRepository) {
			publishAttributes.repository = parsedRepository[2];
			publishAttributes.username = parsedRepository[1];
		}
		return publishAttributes;
	};

	return githubProvider;
});