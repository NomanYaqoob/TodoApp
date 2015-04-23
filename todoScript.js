/**
 * Created by Administrator on 4/23/2015.
 */


var app = angular.module('TodoList',['ngMaterial']);


app.service("UserData", function () {
    var UserTasks = [];
    this.addTask = function (object) {
        UserTasks.push({title:object.title,task:object.task});
    };

    this.getUserData = function () {
        return UserTasks;
    }
});

app.controller('inputController', function($scope,UserData) {


    $scope.addNew = function () {
        UserData.addTask($scope.user);
        $scope.user.title = "";
        $scope.user.task = "";
    }

});


app.controller('AppCtrl', function($scope,$mdDialog,UserData) {
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';

    $scope.userArr = UserData.getUserData();


    $scope.showAdvanced = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog.html',
        targetEvent: ev
    })
        .then(function(answer) {
            $scope.alert = 'Task "' + answer + '".';
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
};
});
function DialogController($scope, $mdDialog,UserData) {
    $scope.user = {
        title: "",
        task:""
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.add = function(answer) {
        //console.log("add is called");
        if(!($scope.user.title == "" && $scope.user.task == "" )) {
            UserData.addTask($scope.user);
        }
        $scope.user.title = "";
        $scope.user.task = "";
        $mdDialog.hide(answer);

    };
}