'use strict';

(function () {


  /**
   * Example function.
   * @see https://www.drupal.org/node/304258#drupal-behaviors
   */
  Drupal.behaviors.sayHello = {
    'attach': function (context) {
      // Do JavaScript things in here!
      const logMessage = (message) => console.log(message);
      logMessage('Hello, world!');
    },
  };

})();
