const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Serve static files like the HTML page
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req,res)=>{
    res.render("login.ejs")
})
// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log("Received form data:", formData);

    // Let's create a reminder based on the user's inputs
    let reminder = "Keep pushing towards your goals! Here's a tip: Start small, but be consistent!";

    // If the user wants to inculcate hobbies
    if (formData.inculcateHobbies && formData.inculcateHobbies.trim() !== '') {
        reminder = `Great! Make sure to practice your new hobby of ${formData.inculcateHobbies} every day for at least 30 minutes to build consistency.`;
    }

    // If the user wants to lose bad habits
    if (formData.badHabits && formData.badHabits.trim() !== '') {
        reminder = `Focus on breaking your bad habit of ${formData.badHabits} by gradually replacing it with something more productive. Stay disciplined!`;
    }

    // Save data to a file or database (for simplicity, saving to a file here)
    const filePath = path.join(__dirname, 'form_data.json');
    fs.readFile(filePath, (err, data) => {
        let existingData = [];
        if (!err && data.length > 0) {
            existingData = JSON.parse(data);  // Parse existing data if file exists
        }

        // Append new form data
        existingData.push(formData);

        // Save the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.log("Error saving data:", err);
                res.status(500).send('Error saving data');
                return;
            }
            res.json({ message: 'Form submitted successfully!', reminder: reminder });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
