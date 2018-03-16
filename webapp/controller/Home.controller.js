sap.ui.define([
	"nl/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("nl.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf nl.view.Home
		 */
			onInit: function() {
				this.getView().setModel(this.getOwnerComponent().getModel("NorthWindDataModel"));
			
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf nl.view.Home
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf nl.view.Home
		 */
			onAfterRendering: function() {
		
			},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf nl.view.Home
		 */
		//	onExit: function() {
		//
		//	}
		
		OnSelectionChange : function(oEvent){
			console.log(oEvent);
			// var obj = oEvent.getSource().getModel().getProperty(oEvent.getSource().getSelectedContexts()[0].sPath);
			// this.getOwnerComponent().getModel("LocalDataModel").setProperty("/ProductInfo", obj);
			// this.showDetail(obj)
			
			var obj = oEvent.getSource().getParent().getModel().getProperty(oEvent.getSource().getParent().getBindingContext().sPath);
			this.getOwnerComponent().getModel("LocalDataModel").setProperty("/ProductInfo", obj);
			this.showDetail(obj)
		},
		showDetail: function(oItem) {
			this.getOwnerComponent().getRouter().navTo("page3", {
				proId: oItem.ID
			});
		},
		handleCreateFormBtn : function(oEvent){
			this.getOwnerComponent().getRouter().navTo("page2");
		},
		handleDelete : function(oEvent){
			// var oList = oEvent.getSource(),
			// oItem = oEvent.getParameter("listItem"),
			// oPath = oItem.getBindingContext().getPath();
			// console.log(oList);

			// after deletion put the focus back to the list
			//oList.attachEventOnce("updateFinished", oList.focus, oList);

			// send a delete request to the odata service
			
			//oList.getModel().remove(oPath);
			
			var idList = this.getView().byId("idList");
			var oPath = oEvent.getSource().getParent().getBindingContext().sPath;
			idList.getModel().remove(oPath);
		},
		handleMultiDelete : function(oEvent){
			var oList = this.getView().byId("idList");
			var oSelectedItems = oList.getSelectedItems();
			var olen = oSelectedItems.length;
			console.log(olen);
			
			for(var i=0; i<olen; i++){
				var oPath = oSelectedItems[i].getBindingContext().getPath();
				console.log(oPath);
				oList.getModel().remove(oPath);	
			}
		}

	});

});