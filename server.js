import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const EXCEL_FILE_PATH = path.join(__dirname, 'registrations.XLSX');

// Initialize Excel file if it doesn't exist
const initExcel = () => {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    XLSX.writeFile(wb, EXCEL_FILE_PATH);
    console.log('Created new Excel file:', EXCEL_FILE_PATH);
  }
};

initExcel();

app.post('/api/register', (req, res) => {
  try {
    const userData = req.body;
    console.log('Received registration data:', userData);

    // Read existing workbook
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON to append data
    const existingData = XLSX.utils.sheet_to_json(worksheet);
    
    // Add timestamp
    const newData = {
      ...userData,
      registrationDate: new Date().toLocaleString(),
    };

    existingData.push(newData);

    // Create new worksheet with updated data
    const newWorksheet = XLSX.utils.json_to_sheet(existingData);
    workbook.Sheets[sheetName] = newWorksheet;

    // Write back to file
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);

    res.status(200).json({ message: 'Registration successful and stored in Excel.' });
  } catch (error) {
    console.error('Error saving to Excel:', error);
    res.status(500).json({ message: 'Failed to store registration data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
