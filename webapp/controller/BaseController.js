sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("nl.controller.BaseController", {
		// onInit : function(){
		
		// },
		
		onBack : function(){
			var sPreviousHash = History.getInstance().getPreviousHash();
			if(sPreviousHash !== undefined){
				window.history.go(-1);
			}
			else {
				this.getOwnerComponent().getRouter().navTo("page1", null, true );                        
			}
		}
		
	});
});