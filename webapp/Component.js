sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"nl/model/models",
	"sap/ui/model/odata/v2/ODataModel"
], function(UIComponent, Device, models, ODataModel) {
	"use strict";

	return UIComponent.extend("nl.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createLocalModel(), "LocalDataModel");
			
				var mConfig = this.getMetadata().getManifestEntry("/sap.app/dataSources");
				var oDataModel = new ODataModel(mConfig.mainService.uri, {
					useBatch: true,
					disableHeadRequestForToken: true,
					defaultUpdateMethod: 'PUT',
					json: true,
					defaultBindingMode: "TwoWay",
        			defaultCountMode : "None"
				});
				this.setModel(oDataModel, "NorthWindDataModel");
			
			//parse the current url and display the targets of the routes
			this.getRouter().initialize();                         
		}
	});
});