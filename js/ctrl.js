//controller for menuItemsLsting.html page
app.controller('customersCtrl', function($scope,$http) {

      //fetching data from JSON file    
      $http.get("json/ButcherBurgerMenu-2.json").then(function (response) {
      $scope.myData = response.data.categories;
  });

  //accordion function
  $scope.hideShow= function(index){
    var itemToExpandCollapse =  document.getElementById('items_list_'+index);
    if(itemToExpandCollapse.classList.contains("collapse-item")){
      itemToExpandCollapse.classList.remove("ng-hide","collapse-item");
    }
    else
    {
       itemToExpandCollapse.classList.add("ng-hide","collapse-item");
    }
    
  }

  
});

//controller for adminView.html page
app.controller('adminCtrl',function($scope){
   $scope.newObjects = [];
   $scope.categoryNameField;
   $scope.categoryIDField;
   $scope.userNameCheck = "admin";
   $scope.passwordCheck = "1234";
   $scope.loginSuccess = false;  
    
    angular.element(document).ready(function () {
      // $scope.login();
    });

    //login check function
   $scope.login = function() {
     console.log("username input "+$scope.userName+" user check is:"+$scope.userNameCheck);
     console.log("password input "+$scope.password+" password check is:"+$scope.passwordCheck)
    $scope.userName;
    $scope.password;
    if($scope.userNameCheck == $scope.userName && $scope.passwordCheck == $scope.password)
      {
        alert("login successful");
        $scope.loginSuccess = true;
      }
      else{
          alert("login failure");
          $scope.loginSuccess = false;
      }
    
}
    //manage adding new categories function
    $scope.add = function(){

      //checking if added element already exists or not
      for(i=0;i<$scope.newObjects.length;i++){
        if($scope.newObjects[i].name == $scope.categoryNameField)
        {
          var elementExist = true;
        }
      }
      if(elementExist) {//case element existing
             alert('item already exists!');
             $scope.showError = true;
        }
      else{//case new item for the list
      $scope.newObjects.push({
          name :$scope.categoryNameField,
          id : $scope.categoryIDField,
          editFlag: false
      })
      console.log($scope.newObjects);
       $scope.categoryNameField = null;
	  }
  }

   //removeCategory function
   $scope.removeCategory = function(index){
        $scope.newObjects.splice(index,1);
    }
    //edit category function
   $scope.editCategory = function(index){
    
        var categoryBlockMode= document.getElementById('item_block_id_'+index); 
        var editDoneBtn = document.getElementById("edit_btn_"+index);
        var editField = document.getElementById('edit_field_'+index);
      
        //switching to edit mode 
        if(categoryBlockMode.classList.contains("edit-mode-off"))
        {
          $scope.newObjects[index].editFlag = true;
          editDoneBtn.innerHTML = "Done";
          editField.focus();
          categoryBlockMode.className +=" edit-mode-on";
          categoryBlockMode.classList.remove("edit-mode-off");
        }
        //switching to view mode
        else if(categoryBlockMode.classList.contains("edit-mode-on"))
        {
          $scope.newObjects[index].editFlag = false;
          editDoneBtn.innerHTML = "Edit";
          categoryBlockMode.classList.remove("edit-mode-on");
          $scope.newObjects[index].name = editField.value
        }
    }


});
//directive to prompt a window box before deleting an item to double check and confirm the deletion process
app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])


