var firstThrow = true;
var result = [];
var throwResult = [];
var firstResult = 0;
var secondResult = 0;
var currentScore = 0;
var strike = false;
var spare = false;

app.controller('throwController', ['$scope', function($scope){
  $scope.firstThrow = firstResult;
  $scope.secondThrow = secondResult;
  $scope.currentScore = currentScore;
  $scope.isDisabled = false;
  $scope.result = result;
  $scope.throw = function(){
    if(firstThrow){
      firstResult = Math.floor(Math.random()*11);
      $scope.firstThrow = firstResult;
      $scope.secondThrow = 0;
      if(spare){
        currentScore += firstResult*2;
        spare = false;
      }else{
        currentScore += firstResult;
      }
      firstThrow = false;
      throwResult.push(firstResult);
      if(result.length > 9 && !(strike)){
        $scope.isDisabled = true;
        console.log("Aus!");
      }
      if(firstResult === 10){
        if(strike){
          currentScore += firstResult;
          strike = false;
        }
        strike = true;
        console.log("Strike!!");
        secondResult = 0;
        $scope.secondThrow = secondResult;
        firstThrow = true;
        throwResult.push(secondResult);
        result.push(throwResult);
        throwResult = [];
      }
    }else{
      secondResult = Math.floor(Math.random()*(11-firstResult));
      $scope.secondThrow = secondResult;
      firstThrow = true;
      throwResult.push(secondResult);
      if(strike){
        currentScore += secondResult * 2;
        currentScore += firstResult;
        strike = false;
      }else{
        currentScore += secondResult;
      }
      result.push(throwResult);
      throwResult = [];
      if((firstResult+secondResult) === 10){
        spare = true;
        console.log("Spare!!")
      }
      if(result.length > 9 && !(strike) && !(spare)){
        $scope.isDisabled = true;
        console.log("Aus!");
      }else if (result.length > 10) {
        $scope.isDisabled = true;
        console.log("Aus!");
      }
    }
    //Show results
    $scope.currentScore = currentScore;
    $scope.result = result;
  };
  $scope.reset = function(){
    firstThrow = true;
    result = [];
    throwResult = [];
    firstResult = 0;
    secondResult = 0;
    currentScore = 0;
    strike = false;
    spare = false;
    $scope.firstThrow = firstResult;
    $scope.secondThrow = secondResult;
    $scope.result = result;
    $scope.currentScore = 0;
    $scope.isDisabled = false;
  };
}]);
