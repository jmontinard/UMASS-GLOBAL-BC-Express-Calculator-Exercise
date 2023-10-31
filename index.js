const express = require('express');
const fs = require('fs');
const moment = require('moment');

const app = express();
const port = 8010;

app.use(express.static('static'));

// Middleware to parse query params
app.use(express.json());

// Define a function to calculate mean
function calculateMean(nums) {
  const numArray = nums.split(',').map(Number);
  if (numArray.some(isNaN)) {
    throw new Error("Invalid number in 'nums'");
  }
  return numArray.reduce((acc, num) => acc + num, 0) / numArray.length;
}

// Define a function to calculate median
function calculateMedian(nums) {
  const numArray = nums.split(',').map(Number);
  if (numArray.some(isNaN)) {
    throw new Error("Invalid number in 'nums'");
  }
  numArray.sort((a, b) => a - b);
  const middle = Math.floor(numArray.length / 2);
  if (numArray.length % 2 === 0) {
    return (numArray[middle - 1] + numArray[middle]) / 2;
  } else {
    return numArray[middle];
  }
}

// Define a function to calculate mode
function calculateMode(nums) {
  const numArray = nums.split(',').map(Number);
  if (numArray.some(isNaN)) {
    throw new Error("Invalid number in 'nums'");
  }

  let counts = {};
  let maxCount = 0;
  let modes = [];

  numArray.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
    if (counts[num] > maxCount) {
      maxCount = counts[num];
    }
  });

  for (let num in counts) {
    if (counts[num] === maxCount) {
      modes.push(Number(num));
    }
  }

  return modes;
}

// Route for calculating mean
app.get('/', (req, res) => {
  // res.sendFile(resolve(__dirname, 'pages/index.html'));
  res.send(`<html>
      <body>
        <h1>WELCOME To math world</h1>
        <p> add /"operation"?nums=1,2,4 or whatever nums you would like to end to the domain and the operation will be you path, with nums being the search param</p>
      
      </body>
    </html>
  `);
  // learn hwo to send res . blachj to send back a page
});
app.get('/mean', (req, res) => {
  try {
    const { nums } = req.query;
    if (!nums) {
      throw new Error('nums are required');
    }
    const mean = calculateMean(nums);
    res.json({ operation: 'mean', value: mean });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for calculating median
app.get('/median', (req, res) => {
  try {
    const { nums } = req.query;
    if (!nums) {
      throw new Error('nums are required');
    }
    const median = calculateMedian(nums);
    res.json({ operation: 'median', value: median });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for calculating mode
app.get('/mode', (req, res) => {
  try {
    const { nums } = req.query;
    if (!nums) {
      throw new Error('nums are required');
    }
    const modes = calculateMode(nums);
    res.json({ operation: 'mode', value: modes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for calculating all operations
app.get('/all', (req, res) => {
  try {
    const { nums } = req.query;
    if (!nums) {
      throw new Error('nums are required');
    }

    const mean = calculateMean(nums);
    const median = calculateMedian(nums);
    const modes = calculateMode(nums);

    res.json({ operation: 'all', mean, median, mode: modes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
