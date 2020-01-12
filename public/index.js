'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(cars);
console.log(rentals);
console.log(actors);

//STEP 1
function rentalPrice(pricePerDay, pricePerKm, distance, days)
{
  return (pricePerDay*days)+(pricePerKm*distance);
}

function diffDate(date1, date2)
{
  var time_diff = date2.getTime() - date1.getTime();
  var days_Diff = time_diff / (1000 * 3600 * 24);
  return days_Diff;
}

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

function displayRentalPrice()
{
  console.log("[");
  for (var car of cars)
  {
    for (var rental of rentals)
    {
      if(car.id == rental.carId)
      {
        var price = rentalPrice(car.pricePerDay, car.pricePerKm, rental.distance, diffDate(parseDate(rental.pickupDate), parseDate(rental.returnDate)));
        console.log("{\nid: "+rental.id+ ",\nprice: "+price+"\n},");
      }
    }
  }
      console.log("]");
}

displayRentalPrice()

//STEP 2:
function decreasingPrice(rentalDays, price)
{
  if(rentalDays > 1)
      price = price * 0.9;
  if(rentalDays > 4)
      price = price * 0.7;
  if(rentalDays > 10)
      price = price * 0.5;
  return price;
}

function displayRentalPriceWithPromotion()
{
  for (var car of cars)
  {
    for (var rental of rentals)
    {
      if(car.id == rental.carId)
      {
        var rentalDays = diffDate(parseDate(rental.pickupDate), parseDate(rental.returnDate));
        var price = rentalPrice(car.pricePerDay, car.pricePerKm, rental.distance, rentalDays);
        price = decreasingPrice(rentalDays, price);
        rental.price = price;
      }
    }
  }
  console.log(rentals);
}
displayRentalPriceWithPromotion()

//STEP 3:
function commission()
{  
  var commission = 0;
  for(var rental of rentals)
  {
      if(rental.price > 0)
      {
        commission = rentalPrice*0.3;
        rental.insurance = commission * 0.5;
        rental.treasury = 1;
        rental.virtuo = commission - rental.insurance - rental.treasury;
      }
    }    
 }

commission()
console.log(rentals)

//STEP 4:
function rentalPriceWithDeductibleOption(pricePerDay, pricePerKm, distance, days, deductibleReduction)
{
  if(deductibleReduction === true)
      return ((pricePerDay+4)*days)+(pricePerKm*distance);
  else
    return (pricePerDay*days)+(pricePerKm*distance);
}

function displayNewRentalPrice()
{
  for (var car of cars)
  {
    for (var rental of rentals)
    {
      if(car.id == rental.carId)
      {
        var rentalDays = diffDate(parseDate(rental.pickupDate), parseDate(rental.returnDate));
        var price = rentalPriceWithDeductibleOption(car.pricePerDay, car.pricePerKm, rental.distance, rentalDays, rental.options.deductibleReduction);
        price = decreasingPrice(rentalDays, price);
        rental.price = price;
      }
    }
  }
  commission();
  console.log(rentals);
}

displayNewRentalPrice()

//STEP 5:
function payActors()
{ 
 for(var actor of actors)
  {
    for(var rental of rentals)
    {
      if(actor.rentalId == rental.id)
       {
          for(var pay of actor.payment)
          {
           if(pay.who == 'driver') 
             pay.amount = rental.price;
           if(pay.who == 'partner') 
             pay.amount = rental.price*0.7;
           if(pay.who == 'insurance') 
             pay.amount = rental.insurance;
           if(pay.who == 'treasury') 
             pay.amount = rental.treasury;       
           if(pay.who == 'virtuo') 
             pay.amount = rental.virtuo;
          }     
           console.log(actors);
       }
    }
  }
}

payActors();

