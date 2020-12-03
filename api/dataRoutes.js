const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const Excel = require('exceljs');


// NOTE: these routes are currently sending dummy data, but they should connect to Postgres or Mongo to query necessary data

router.get('/barchart', async (req, res) => {

  res.send({ 
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ] 
  });

})

router.get('/linechart', async (req, res) => {

  res.send({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  })

})

router.get('/map_data', async (req, res) => {

  res.send('include relevant geodata here');

})

router.get('/table_data', async (req, res) => {

  res.send([
    { firstName: 'John', lastName: 'Smith', age: 27, visits: 5, status: 'good', progress: 'n/a' },
    { firstName: 'John', lastName: 'Smith', age: 27, visits: 5, status: 'good', progress: 'n/a' },
    { firstName: 'John', lastName: 'Smith', age: 27, visits: 5, status: 'good', progress: 'n/a' },
    { firstName: 'John', lastName: 'Smith', age: 27, visits: 5, status: 'good', progress: 'n/a' },
    { firstName: 'John', lastName: 'Smith', age: 27, visits: 5, status: 'good', progress: 'n/a' },
    { firstName: 'John', lastName: 'Smith', age: 27, visits: 5, status: 'good', progress: 'n/a' }
  ]);

})

router.get("/download_csv", async (req, res) => {

  const fields = ['car', 'price', 'color'];
  const opts = { fields };
  const myCars = [
    {
      "car": "Audi",
      "price": 1,
      "color": "blue"
    }, {
      "car": "BMW",
      "price": 1,
      "color": "black"
    }, {
      "car": "Porsche",
      "price": 1,
      "color": "green"
    }
  ];

  try {

    const parser = new Parser(opts);
    const csv = parser.parse(myCars);

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);

  } catch(err) {

    console.error(err);
    res.sendStatus(400);

  }

});

router.get('/download_xlsx', async (req, res) => {

  try {

    let workbook = new Excel.Workbook();
    let sheet = workbook.addWorksheet('Test');

    sheet.columns = [
      { header: 'Car', key: 'car', width: 30 },
      { header: 'Price', key: 'price' },
      { header: 'Color', key: 'color', width: 12 },
    ]

    sheet.addRow({ car: 'Audi', price: 1, color: 'blue' });
    sheet.addRow({ car: 'BMW', price: 1, color: 'black' });
    sheet.addRow({ car: 'Porsche', price: 1, color: 'green' });

    // WRITES FILE, CONVERTS TO BASE64 FOR TRANSFER FROM SERVER TO CLIENT, AND RETURNS
    const binaryFile = await workbook.xlsx.writeBuffer();
    const base64 = binaryFile.toString('base64');

    res.setHeader('Content-Type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(base64);

  } catch(err) {

    console.error(err);
    res.sendStatus(400);

  }

})

module.exports = router;