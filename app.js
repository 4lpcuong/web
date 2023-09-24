const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const notepadPath = path.join(__dirname, 'location.txt'); // Đường dẫn tới tệp Notepad

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/update-location', (req, res) => {
  const { latitude, longitude } = req.body;
  const locationData = `Latitude: ${latitude}, Longitude: ${longitude}\n`;

  // Ghi dữ liệu vào tệp Notepad
  fs.appendFile(notepadPath, locationData, (err) => {
    if (err) {
      console.error('Lỗi khi ghi dữ liệu vào tệp Notepad:', err);
      res.status(500).send('Lỗi khi ghi dữ liệu vào tệp Notepad');
    } else {
      console.log('Dữ liệu đã được ghi vào tệp Notepad');
      res.status(200).send('Cập nhật vị trí thành công');
    }
  });
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server đang lắng nghe trên cổng ${port}`);
});
