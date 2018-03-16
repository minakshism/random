/*eslint linebreak-style: ["error", "windows"]*/
sap.ui.define([
	"nl/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("nl.controller.UpdateView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf nl.view.UpdateView
		 */
			onInit: function() {
				this.getView().setModel(this.getOwnerComponent().getModel("LocalDataModel"));
			},
			
			fnUpdateList : function(oEvent){
				var oid = this.getView().byId("sId").getValue();
				var oname = this.getView().byId("idname").getValue();
				var odescription = this.getView().byId("idDescription").getValue();
				var odate = this.getView().byId("idDate").getValue();
				var oDiscontinue = this.getView().byId("idDiscontinue").getValue();
				var orating = this.getView().byId("idRating").getValue();
				var oprice = this.getView().byId("idPrice").getValue();
				var oModel = this.getOwnerComponent().getModel("NorthWindDataModel");
				var oData = {
				ID: oid,
				Name: oname,
				Description: odescription,
				ReleaseDate:new Date(odate),
				DiscontinuedDate:new Date(oDiscontinue),
				Rating: orating,
				Price: oprice
				};
				
				oModel.update("/Products(" + oData.ID + ")", oData, {
					groupId:"idEditBatch",
					changeSetId:"idEditBatch",//****
					success: jQuery.proxy(function(oResponse){
						
					}, this),
					error: jQuery.proxy(function(oResponse){
					
					}, this)
				});
				
				oModel.submitChanges("idEditBatch"); 
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf nl.view.UpdateView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf nl.view.UpdateView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf nl.view.UpdateView
		 */
		//	onExit: function() {
		//
		//	}

	});

});