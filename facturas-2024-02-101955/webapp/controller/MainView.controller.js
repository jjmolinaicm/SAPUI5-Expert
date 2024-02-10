sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("jjms.com.facturas.controller.MainView", {
            onInit: function () {
                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();
                oJSONModel.loadData("./model/SelectionScreenMenu.json");
                oView.setModel(oJSONModel, "selectionScreen"); // selectionScreen es un identificador
                // linea de abajo es una alternativa a la de arriba
                // this.getView().setModel(oJSONModel,"selectionScreen");
            },

            onFilter: function (oEvent) {
 
                var vComboBoxSel = this.getView().byId('slCountry').getSelectedItem().getText();

                const oData = this.getView().getModel("selectionScreen").getData();
                let filters = [];

                if (oData.ShipName !== "") {
                    filters.push(new Filter("ShipName", FilterOperator.Contains, oData.ShipName));
                }

                if (vComboBoxSel !== "") {
                    filters.push(new Filter("Country", FilterOperator.Contains, vComboBoxSel));
                }
 
                var oBinding = this.byId("invoicesList").getBinding("items");
                oBinding.filter(filters);

            },

            onClearFilter: function (oEvent)  {
                const oModelSelScreen = this.getView().getModel("selectionScreen");
                oModelSelScreen.setProperty("/ShipName", "");
  
                this.getView().byId("slCountry").setSelectedKey(null);
                let filters = [];
                var oBinding = this.byId("invoicesList").getBinding("items");
                oBinding.filter(filters);
             }
        });
    });
