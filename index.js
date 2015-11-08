(function () {
  
  var smsSettings = {  
    initialize: function initialize() {
      var sms_button = document.querySelector('#messages-options-button');
      sms_button.addEventListener('click', this.renderItems);
    },

    renderItems: function renderItems() {
      function onClickSetting() {
        document.querySelector('form.visible').classList.remove('visible');
        
        new MozActivity({
          name: 'configure',
          data: {
            target: 'device',
            section: 'messaging'
          }
        });
      }

      var sms_form = document.querySelector('form.visible > menu');
      
      if(sms_form && sms_form.lastElementChild.previousElementSibling.dataset.l10nId !== "settings") {
        var sms_settingButton = document.createElement('button');

        sms_settingButton.dataset.l10nId = 'settings';
        sms_form.insertBefore(sms_settingButton, sms_form.lastElementChild);
        sms_settingButton.addEventListener('click', onClickSetting);
      }
    }
  };

  /*if (document.documentElement) {
    smsSettings.initialize();
  } else {
    window.addEventListener('load', smsSettings.initialize);
  }/*

  /*navigator.mozApps.mgmt.addEventListener('enabledstatechange', function(event) {
    var app = event.application;
    if (app.manifestURL === 'app://sms.gaiamobile.org/manifest.webapp') {
      smsSettings.initialize();
    }
  });*/
  
  // If injecting into an app that was already running at the time
  // the app was enabled, simply initialize it.
  if (document.documentElement) {
    smsSettings.initialize();
  } else {
    // Otherwise, we need to wait for the DOM to be ready before
    // starting initialization since add-ons are usually (always?)
    // injected *before* `document.documentElement` is defined.
    window.addEventListener('DOMContentLoaded', smsSettings.initialize);
  } 



}());
