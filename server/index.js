const express = require('express');
const formidable = require('formidable');
const morgan = require('morgan');
const generator = require('./src/generator.js');
const app = express();
const port = 3000;
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'public','index.html');
const filePath = path.resolve(__dirname, '..', 'server', 'public', 'csv_report.csv');

app.use(morgan('dev'));

app.use(express.static('./server/public'));
app.use(express.static(htmlPath));


app.get('/', (req, res)=>{
  res.status(200).sendFile(htmlPath);
})
app.post('/', (req, res)=>{
  const form = formidable ();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    generator(JSON.parse(fields.data), ()=>(res.status(200).sendFile(filePath)));

  });
});
app.listen(port, ()=>
  console.log(`Server listening on port ${port}`)
);