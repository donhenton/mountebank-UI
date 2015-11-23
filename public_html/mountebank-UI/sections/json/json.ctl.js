angular.module('myApp')

        .controller('JsonCtrl', function ($log, TPL_PATH, mounteBankDisplay,HEADER_LOCATION ,
            currentImposter, MountebankService) {
            var vm = this;
            vm.mounteBankUrl = "http://localhost:2525";
            vm.currentImposter = currentImposter;
            vm.headerLocation = HEADER_LOCATION;
            //vm.displayData = angular.toJson(vm.currentImposter,true);
            vm.displayData = mounteBankDisplay;
            vm.message = "";
            var baseMessageClass = "emphasis pull-right";
            vm.messageClasses = ""; // text-danger or text-success

            vm.deleteFromMountebank = function ()
            {
                // url,port

                MountebankService
                        .deleteFromMountebank(vm.mounteBankUrl, vm.currentImposter.port)
                        .then(function (response) {

                            //data is the return body
                            //status in int return code
                            if (response.status === 200)
                            {

                                vm.messageClasses = baseMessageClass + " text-success";
                                vm.message = "Successful delete from Mountebank port "
                                        + vm.currentImposter.port;

                            }


                        }, function (errorThing) {

                            vm.messageClasses = baseMessageClass + " text-danger";
                            vm.message = "Error: " + errorThing.status + " " +
                                    errorThing.statusText;

                        });
            }

            vm.postToMountbank = function ()
            {
                MountebankService
                        .postToMountebank(vm.mounteBankUrl, vm.displayData)
                        .then(function (response) {

                            //data is the return body
                            //status in int return code
                            if (response.status === 201)
                            {

                                vm.messageClasses = baseMessageClass + " text-success";
                                vm.message = "Successful add to Mountebank";

                            }


                        }, function (errorThing) {
                            vm.message = "General Error";
                            vm.messageClasses = baseMessageClass + " text-danger";
                            if (errorThing.status === -1)
                            {
                                vm.message = "Error: problem posting to Mountebank. " +
                                        "Mountebank server may need --allow-CORS mode";
                            }
                            else
                            {
                                vm.message = "Error: " + errorThing.status + " " +
                                        errorThing.statusText;
                            }
                            if (errorThing.status === 400)
                            {
                                vm.message += " only one submission per session"
                            }


                        });




            }


        });

