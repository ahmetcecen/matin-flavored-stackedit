define([
	"jquery",
	"underscore",
	"constants",
	"utils",
	"eventMgr",
	"providers/couchdbProvider",
	"providers/downloadProvider",
	"providers/gistProvider"
], function($, _, constants, utils, eventMgr) {

	var sharing = {};

	eventMgr.onSharingCreated(sharing);
	return sharing;
});
