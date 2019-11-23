// helpers
// var _ = require('lodash');
var log = require('../core/log.js');

//var config = require('../core/util.js').getConfig();
//var settings = config.buyatsellat;

// let's create our own method
var method = {};

// prepare everything our method needs
  method.init = function() {
  this.name = 'buyatsellat';

  this.previousAction = 'sell';
  this.previousActionPrice = Infinity;
}

// What happens on every new candle?
method.update = function(candle) {
  //log.debug('in update');
}

// for debugging purposes log the last 
// calculated parameters.
method.log = function(candle) {
  //log.debug(this.previousAction)
}

method.check = function(candle) {  
  const buyat = 1.05; // amount of percentage of difference required
  const sellat = 0.95; // amount of percentage of difference required

  if(this.previousAction === "buy") {
    // calculate the minimum price in order to sell
    const threshold = this.previousActionPrice * buyat;

    // we sell if the price is more than the required threshold
    if(candle.close > threshold) {
      this.advice('short');
      this.previousAction = 'sell';
      this.previousActionPrice = candle.close;
    }
  }

  else if(this.previousAction === "sell") {
  // calculate the minimum price in order to buy
    const threshold = this.previousActionPrice * sellat;

    // we buy if the price is less than the required threshold
    if(candle.close < threshold) {
      this.advice('long');
      this.previousAction = 'buy';
      this.previousActionPrice = candle.close;
    }
   
  }
}

module.exports = method;