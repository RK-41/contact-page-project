# Contact Page Project
## React Form with Google Apps Script Integration

This project demonstrates a React application that uses a form to collect user data and submits it to a Google Apps Script endpoint for processing and storage in a Google Sheet.

## Links:
- [Deployement](https://contact-page-project-gamma.vercel.app/)
- [Google Sheet](https://docs.google.com/spreadsheets/d/1guoDXF1i6u2sSWbfviHpm15UJbuxmB51crpHtl6lUss/edit#gid=1061479620)
- [Demo](https://www.youtube.com/watch?v=ttvhppRdP-8)

## Checking out the App:

- Access the application in your browser.
- Fill out the form with your name, email, phone and message.
- Click the "Submit" button.
- If successful, you should see a confirmation message and the data should be added to the Google Sheet.

## Features:

- Leverages React for a smooth user interface experience.
- Uses Zod for robust form validation and type safety.
- Submits form data to a Google Apps Script endpoint for processing.
- Stores submitted data in a Google Sheet.

--- 

## Development Prerequisites:
- Basic knowledge of React and JavaScript
- A Google account and a Google Sheet

## Setup:

### 1. Create a Google Sheet:
- Go to https://docs.google.com/spreadsheets/create and create a new Google Sheet.
- Name the sheet and add the desired columns to store your form data (e.g., Name, Email, Phone and Message).

### 2. Access Apps Script:
- In the opened Google Sheet, click on Extensions in the menu bar.
- Select Apps Script from the dropdown menu.
- A new script editor window will open.

### 3. Write the Script Code:
- Paste the following code into the script editor, replacing the placeholder sheet name and the access level based on your needs:

```
// JavaScript

// 'sheetName' should match your Google sheet's name
const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup(){
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost(e){
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try{
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header){
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService.createTextOutput(JSON.stringify({'result': 'success', 'row': nextRow})).setMimeType(ContentService.MimeType.JSON)
  }

  catch(e){
    return ContentService.createTextOutput(JSON.stringify({'result': 'error', 'error': e})).setMimeType(ContentService.MimeType.JSON)
  }

  finally{
    lock.releaseLock()
  }
}
```

### 4. Save the Script:
- Click on File > Save or press Ctrl + S (Command + S on Mac) to save the script. Give it a meaningful name, such as "FormSubmitter".

### 5. Deploy the Script as a Web App:
- In the Script editor menu, navigate Deploy > New Deployment.
- Select type as Web App.
- Select appropriate access level.
- Click "Deploy" button and give required permissions.
- Copy the "Web App URL"

### 6. Clone this repository:
- Use git clone https://github.com/your-username/react-google-apps-script-form.git to clone this repository.

### 7. Install dependencies:
- Run npm install in the project directory to install required dependencies.

### 8. Setup shadcn/ui:
- Run the following command to setup the project: ([Reference](https://ui.shadcn.com/docs/installation/next))
  ```
  npx shadcn-ui@latest init
  ```
- Run the following commands to add shadcn/ui components:
  ```
  npx shadcn-ui@latest add button
  ```
  ```
  npx shadcn-ui@latest add form
  ```
  ```
  npx shadcn-ui@latest add input
  ```
  ```
  npx shadcn-ui@latest add textarea
  ```

### 9. Update environment variables:
- Create a file named .env.local in the project root directory (ignore this file in version control).
- Add the following line, replacing YOUR_WEB_APP_URL with the copied URL from step 5:
NEXT_PUBLIC_WEB_APP_URL=YOUR_WEB_APP_URL

### 10. Start the development server:
- Run npm start to start the development server. The application will be available at http://localhost:3000 by default.

--- 
