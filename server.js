import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, whatsappNumber, studentRegNo, university, faculty, academicYear } = req.body;
    console.log('Received registration data:', req.body);

    // 1. Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Prepare the data row
    const registrationDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
    const values = [
      [
        fullName,
        email,
        whatsappNumber,
        studentRegNo,
        university,
        faculty,
        academicYear,
        registrationDate
      ]
    ];

    // 3. Append to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    res.status(200).json({ message: 'Registration successful and stored in Google Sheets!' });
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    res.status(500).json({ message: 'Failed to store registration data.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
