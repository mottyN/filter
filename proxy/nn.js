const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// הוספת morgan כ middleware עם אפשרות לכתיבה לקובץ
app.use(morgan('common', {
    stream: fs.createWriteStream('logs.txt', { flags: 'a' })
}));

// מידול נוסף
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// השמעת השרת
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
