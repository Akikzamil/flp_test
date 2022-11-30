sap.ui.define(
  [ "sap/ui/core/mvc/Controller",
  'sap/ui/core/Fragment',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast'],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,Fragment,JSONModel,MessageToast) {
    "use strict";

    return Controller.extend("com.practice.project1.controller.View1", {
      onInit: function () {
        // sap.ushell.Container.getServiceAsync("UserInfo").then(function (UserInfo) {
        //     console.log(UserInfo.getFullName()                        );
        // });
        var oRenderer = sap.ushell.Container.getRenderer("fiori2");

// Create an icon button that opens a dialog
        let that = this;
        oRenderer.addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem",{
            id: "myTestButton",
            icon: "sap-icon://action-settings",
            tooltip: "grewgrewg",
            text: "grewgrewg",
            ariaLabel: "grewgrewg",
            ariaHaspopup: "dialog",
            visible: true,
            press: this.handleTestButtonPress.bind(this)
        }, true,true);
},
handleTestButtonPress(oEvent){
    console.log("Hello")
    this.onPress(oEvent);
    var oButton = oEvent.getSource(),
    oView = this.getView();
    console.log(oButton)
    console.log(oView)
    const that = this;

    try{

      if (!this._pPopover) {
      this._pPopover = Fragment.load({
          id: oView.getId(),
          name: "com.practice.project1.view.Popover",
          controller: that
      }).then(function(oPopover) {
          oView.addDependent(oPopover);
          // oPopover.bindElement("product>/ProductCollection/0");
          return oPopover;
      });
  }
  this._pPopover.then(function(oPopover) {
      oPopover.openBy(oButton);
  });
    }catch(e){
      console.log(e)
    }
    
    // create popover
},
onSettingsDialogOpen:function(){
   console.log("first");
    MessageToast.show("feefefefef");
    var oView = this.getView();
        if (!this._pValueHelpDialogs) {
            this._pValueHelpDialogs = Fragment.load({
                id: oView.getId(),
                name: "com.practice.project1.view.Settings",
                controller: this,
            }).then(function (oValueHelpDialog) {
                oView.addDependent(oValueHelpDialog);
                return oValueHelpDialog;
            });
        }
        this._pValueHelpDialogs.then(
            function (oValueHelpDialog) {
                oValueHelpDialog.open();
            }.bind(this)
        );
},


  onPress: function (oEvent) {
        // read SupplierID from OData path Product/SupplierID
        var oCrossAppNavigator = sap.ushell.Container.getService(
          "CrossApplicationNavigation"
        ); // get a handle on the global XAppNav service
        console.log(oCrossAppNavigator)
        var hash =
          (oCrossAppNavigator &&
            oCrossAppNavigator.hrefForExternal({
              target: {
                semanticObject: "Sample",
                action: "display",
              },
              params: {}
            })) ||
          "";
          console.log(hash)
          // generate the Hash to display a Supplier
        oCrossAppNavigator.toExternal({
          target: {
            shellHash: hash,
          },
        });
      },
    });
  }
);
