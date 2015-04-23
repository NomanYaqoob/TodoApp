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
    };

    this.removeTask = function(title,task) {
        console.log(title+","+task);
       var index = findWithAttr(UserTasks,"title",title);
        console.log(index);
        UserTasks.splice(index,1);
    };

    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
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
        .then(function() {
            $scope.alert = 'You Added a Task';
        }, function() {
            $scope.alert = 'You cancelled the Task.';
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
    $scope.add = function() {
        //console.log("add is called");
        if(!($scope.user.title == "" && $scope.user.task == "" )) {
            UserData.addTask($scope.user);
        }
        $scope.user.title = "";
        $scope.user.task = "";
        $mdDialog.hide();

    };
}

app.controller('SlideView',function($scope, $log,UserData){
    var tabs = [
            { title: '', content: ""}
        ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    /*$scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = tabs[current];
        if ( old && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
        if ( current )                $log.debug('Hello ' + selected.title + '!');
    });*/
   /* $scope.addTab = function () {
        var arr =  UserData.getUserData();
        for (var item = 0; item < arr.length;item++) {
            //view = view || UserData.title + " Content View";
            console.log(arr[item]);
            tabs.push({ title: arr[item].title, content: arr[item].task, disabled: false});
        }

    };*/

    $scope.addTab = function () {
        UserData.addTask($scope.user);
        tabs.push({ title: $scope.user.title, content: $scope.user.task, disabled: false});
    };
    $scope.removeTab = function (tab) {

        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);
        UserData.removeTask(tab.title,tab.content);
    };
});
