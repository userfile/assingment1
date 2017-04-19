var app = angular.module('MyApp', []);

app.controller('MyController', ['$scope', 'orderByFilter', function ($scope, orderBy) {

    $scope.data = [{ "Sno": 1, "DishType": "entree", "morning": "eggs", "night": "steak" },
    { "Sno": 2, "DishType": "side", "morning": "Toast", "night": "potato" },
    { "Sno": 3, "DishType": "drink", "morning": "Cofee", "night": "wine" },
    { "Sno": 4, "DishType": "desert", "morning": "", "night": "cake" }
    ];

    $scope.Error = "";
    $scope.input = "";
    $scope.output = ""
    $scope.isValid = true;
    $scope.daytpes = ["morning", "night"];


    var isValidNumber = function (inputnumber) {

        var isValidNumber = false;
        var num = parseInt(inputnumber);
        angular.forEach($scope.data, function (item) {

            if (item.Sno === num) {
                isValidNumber = true;
            }

        });

        return isValidNumber;

    };

    $scope.GetDuplicatesCount = function (num, currentinputs) {

        var nofoTimes = 0;

        angular.forEach(currentinputs, function (iitem, iindex) {

            if (iitem === num) {
                nofoTimes++;
            }
        });

        return nofoTimes;
    };

    $scope.GetDistinctValues = function (currentinputs) {
        var arr = [];

        for (var i = 0; i < currentinputs.length; i++) {

            if (i === 0) {
                arr.push(currentinputs[i]);
            }
            if (i > 0) {

                var isExists = false;
                angular.forEach(arr, function (item, index) {

                    if (index !== i && currentinputs[i] === item) {
                        isExists = true;
                    }

                });

                if (!isExists) {
                    arr.push(currentinputs[i]);
                }
            }


        }
        return arr;
    }
    $scope.GetValueByNo = function (inputnum, daytype) {


        var outputval;
        angular.forEach($scope.data, function (item) {

            if (item.Sno === inputnum) {


                if (item[daytype]) {
                    outputval = item[daytype];
                }
                else {

                    outputval = "error";
                }

            }

        });

        return outputval;

    };

    $scope.PrintOutput = function (filteredarray) {
        //debugger;
        if (filteredarray && filteredarray.length > 0) {

            $scope.daytype = filteredarray[0].toLowerCase();
            $scope.output = '';
            var output = "";
            var numarr = [];

            angular.forEach(filteredarray, function (item, index) {

                if (index > 0) {

                    numarr.push(parseInt(item));
                }

            });


            $scope.oparr = orderBy(numarr, "", false);

            //debugger;
            $scope.distinctvals = $scope.GetDistinctValues($scope.oparr);

            angular.forEach($scope.distinctvals, function (iitem, iindex) {


                var nooftimes = $scope.GetDuplicatesCount(iitem, $scope.oparr);

                if (nooftimes > 1) {
                    var valbynum = $scope.GetValueByNo(iitem, $scope.daytype);

                    var opnumval = valbynum + "(x" + nooftimes + ")";
                    if($scope.output !== ''){
                        $scope.output += "," + opnumval;
                    }else{
                        $scope.output = opnumval;
                    }
                }
                else {
                    if($scope.output !== ''){
                        $scope.output += "," + $scope.GetValueByNo(iitem, $scope.daytype);
                    }else{
                        $scope.output =  $scope.GetValueByNo(iitem, $scope.daytype);
                    }
                }
            });

        }
    };

    $scope.ValidateInput = function () {

        //debugger;
        $scope.output = "";
        $scope.Error = "";
        var val = $scope.input;


        if ($scope.input) {

            var filteredarray = val.split(',');

            if (filteredarray.length > 1) {
                var firstset = filteredarray[0];
                $scope.isinvalidfirstset = true;
                $scope.isinvalidsecondset = false;
                angular.forEach($scope.daytpes, function (item) {

                    if (firstset.toLowerCase() === item) {
                        $scope.isinvalidfirstset = false;
                    }
                });





                //check for invalid firstset
                if (!$scope.isinvalidfirstset) {
                    var reg = /^\d+$/;


                    var lastnum = $scope.input[$scope.input.length - 1];

                    if (!reg.test(lastnum)) {
                        $scope.isinvalidsecondset = true;
                        $scope.Error = "Please enter a valid input (ex: Morning,1,2,3)";
                    }

                    angular.forEach(filteredarray, function (item, index) {
                        //debugger;

                        if (index > 0) {



                            if (!reg.test(item) || !item) {
                                //debugger;
                                $scope.isinvalidsecondset = true;
                                $scope.Error = "Please enter a valid input (ex: Morning,1,2,3)";

                            }
                            else if (!isValidNumber(item)) {
                                //debugger;
                                $scope.isinvalidsecondset = true;
                                $scope.Error = "Please enter a valid input Dish Type ranger in between [1,2,3,4] morning/night (ex: Morning,1,2,3)";
                            }
                        }
                    });



                }
                else {
                    $scope.isinvalidfirstset = true;
                    $scope.Error = "Please enter a valid input (ex: Morning,1,2,3)";
                }


            }
            else {
                $scope.isinvalidfirstset = true;
                $scope.Error = "Please enter a valid input";
            }
        }
        else {
            $scope.isinvalidfirstset = true;
            $scope.Error = "Please enter a value";

        }


        if (!$scope.isinvalidfirstset && !$scope.isinvalidsecondset) {
            $scope.PrintOutput(filteredarray);
        }

    };
} ]);