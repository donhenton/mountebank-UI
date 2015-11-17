/**
 * 
 * create an angular messageFactory
 * 
 * @returns {undefined}
 * https://rclayton.silvrback.com/passing-state-via-services
 */

angular.module('app.services').service('MessagePumpService', messageService);
 function messageService ($log)
{
    
  
  this.sample = function($log)
  {
       
      $log.debug("hello");
  }
  
   

};





 