'use strict';

angular.module('weatherApp', [])
  .controller('WeatherController', function($scope, $http) {
    $scope.userDetails = {};
    $scope.weatherInfo = {};
    var deets = {};
    $scope.weatherDetails = {};
    $scope.getWeather = function() {

    };
    $scope.userLocation = function() {
      $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK")
        .then(function(response) {
          $scope.userDetails.city = response.data.city;
          deets.city = response.data.city;
          $scope.userDetails.region = response.data.region;
          deets.region = response.data.region;
          $scope.userDetails.country = response.data.country;
          $scope.userDetails.loc = response.data.loc;
          $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q=" + deets.city + "," + deets.region + "&APPID=469ed7c19f69fea1d32c2d3ddc01344f&callback=JSON_CALLBACK")
            .then(function(response) {
              $scope.weatherDetails.cod = response.data.weather[0].main;
              $scope.weatherDetails.cel = (response.data.main.temp - 273.15).toFixed(2);
              $scope.weatherDetails.fahr = ($scope.weatherDetails.cel * 1.8 + 32).toFixed(2);
              deets.fahr = $scope.weatherDetails.fahr;
              $scope.weatherDetails.icon = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";
            });
        });
    };

  });

$('#change').on('click', function() {
  $('div').each(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).addClass('inactive');
    } else if ($(this).hasClass('inactive')) {
      $(this).removeClass('inactive');
      $(this).addClass('active');
    }
  });
  $('button').each(function() {
    if ($(this).hasClass('cel')) {
      $(this).removeClass('cel');
      $(this).addClass('fahr');
      $(this).html("Change to Celsius");
    } else if ($(this).hasClass('fahr')) {
      $(this).removeClass('fahr');
      $(this).addClass('cel');
      $(this).html("Change to Fahrenheit");
    }
  });
});