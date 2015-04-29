/**
 * Created by Administrator on 4/23/2015.
 */


//var app = angular.module("TodoList",['','ngMaterial']);

var app = angular.module("TodoList",["ngMaterial"]);

app.service("UserData", function () {
    var UserTasks = [];
    var Category = ["Work","Inbox",'Watch Movie',"Meeting"];
    this.addTask = function (object) {
        UserTasks.push({title:object.title,content:object.content,category:object.category});
    };

    this.getCategories = function () {
        return Category;
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

app.controller('AppCtrl', function($scope,$mdDialog,UserData,$timeout, $mdSidenav, $mdUtil, $log) {
    $scope.userArr = UserData.getUserData();
    $scope.showAdvanced = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog.html',
        targetEvent: ev
    })
        .then(function(answer) {
            $scope.alert = 'task '+answer+"!";
        }, function() {
            $scope.alert = 'task Cancelled!';
        });
    };
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        },300);
        return debounceFn;
    }

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
        if(!($scope.user.title == "" && $scope.user.content == "" )) {
            UserData.addTask($scope.user);
        }
        $mdDialog.hide(answer);
        $mdDialog.hide();

    };

    $scope.getAllCategories = function () {
        return UserData.getCategories();
    }
}

app.controller('SlideView',function($scope, $log,UserData){

     $scope.tabs  = UserData.getUserData();
       var selected = null,
        previous = null;
    $scope.selectedIndex = 2;
    $scope.getAllTabs = function () {
        return UserData.getUserData();
    };
    /*$scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = tabs[current];
        if ( old && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
        if ( current )                $log.debug('Hello ' + selected.title + '!');
    });*/


    /*$scope.addTab = function () {
        UserData.addTask($scope.user);
        tabs.push({ title: $scope.user.title, content: $scope.user.task});
    };*/
    $scope.removeTab = function (tab) {

        var index = $scope.tabs.indexOf(tab);
        $scope.tabs.splice(index, 1);
        UserData.removeTask(tab.title,tab.content);
    };
});

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
});