sap.ui.define([
	"nl/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("nl.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf nl.view.Detail
		 */
			onInit: function() {
			
				//this.getView().setModel(this.getOwnerComponent().getModel("LocalDataModel"));
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf nl.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf nl.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf nl.view.Detail
		 */
		//	onExit: function() {
		//
		//	}
		
		// onPressBtn : function(oEvent){
		// 	var oid = this.getView().byId("sId").getValue();
		// 	var oname = this.getView().byId("idname").getValue();
		// 	var ocity = this.getView().byId("idcity").getValue();
		// 	var ocountry = this.getView().byId("idcountry").getValue();
		// 	var ozip = this.getView().byId("idzip").getValue();
		// 	var oModel = this.getOwnerComponent().getModel("NorthWindDataModel");
		// 	var obj = {
		// 	 ID : oid,
		// 	 Name : oname,
		// 	 Description : ocity,
		// 	 ReleaseDate : ocountry,
		// 	 ZipCode : ozip
		// 	};
		// 	oModel.update("/Suplliers('"+oid+"')", obj, {
		// 		success: jQuery.proxy(function(oResponse){
		// 			console.log("Success");	
		// 		}, this),
		// 		error: jQuery.proxy(function(oResponse){
		// 			console.log("error");
		// 		}, this)
		// 	});
		// },
		
		createList: function() {
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
			oModel.create("/Products", oData, {
				groupId:"idCreateBatch",
				changeSetId:"idCreateBatch",
				success:$.proxy(function(){
					oModel.refresh();
					this.getOwnerComponent().getRouter().navTo("page1");
					this.getView().byId("sId").setValue("");
					this.getView().byId("idname").setValue("");
					this.getView().byId("idDescription").setValue("");
					this.getView().byId("idDate").setValue("");
					this.getView().byId("idDiscontinue").setValue("");
					this.getView().byId("idRating").setValue("");
					this.getView().byId("idPrice").setValue("");
					console.log("success");
				}, this ),
				error: $.proxy(function(){
					console.log("error");
				}, this)
			});
			
			oModel.submitChanges("idCreateBatch")

		}

	});

});