import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, whatsappNumber, studentRegNo, university, faculty, academicYear } = req.body;

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
    // Assumes the first sheet is where data goes. Range 'A1' means it will find the last row automatically.
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return res.status(500).json({ 
      message: 'Failed to save registration.', 
      error: error.message 
    });
  }
}
