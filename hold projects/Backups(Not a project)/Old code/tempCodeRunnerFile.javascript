function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Generate a random integer b6etween min (inclusive) and max (inclusive)
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(getRandomNumber(0, 36))
  console.log(getRandomInt(0,36))