document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form from submitting and refreshing the page

    // Get the values from the form
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const occupation = document.getElementById("occupation").value;
    const hobbies = document.getElementById("hobbies").value;
    const inculcateHobbies = document.getElementById("inculcateHobbies").value;
    const badHabits = document.getElementById("badHabits").value;
    document.getElementById("habitForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent the form from submitting normally
    
        // Get form data
        const formData = new FormData(event.target);
    
        // Convert form data to an object
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
    
        // Send the form data to the server
        fetch("/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)  // Send form data as JSON
        })
        .then(response => response.json())  // Assuming the server returns JSON
        .then(data => {
            console.log("Form submitted successfully:", data);
            alert("Your habit data has been saved!");
    
            // Display the personalized reminder or productivity tip
            const reminderElement = document.getElementById("reminder");
            reminderElement.textContent = data.reminder;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error submitting the form.");
        });
    });
    

    // Create a result message
    const resultMessage = `
        <h3>Summary of Your Input:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Occupation:</strong> ${occupation}</p>
        <p><strong>Hobbies:</strong> ${hobbies}</p>
        <p><strong>Hobbies you want to inculcate:</strong> ${inculcateHobbies}</p>
        <p><strong>Bad habits you want to lose:</strong> ${badHabits}</p>
    `;

    // Display the result in the result div
    document.getElementById("result").innerHTML = resultMessage;
});