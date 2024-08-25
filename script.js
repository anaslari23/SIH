const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Gather data from the form fields
  const formData = new FormData(form);

  // Validate the data
  let isValid = true;
  for (const [key, value] of formData) {
    if (value === '' || value === null || value === undefined) {
      console.error(`Error: Field "${key}" is required.`);
      isValid = false;
    }
    // Add more specific validation rules as needed
  }

  // Submit the data if the validation passes
  if (isValid) {
    // Replace with your actual server-side submission logic
    fetch('/your-endpoint', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Display a success message to the user
        console.log('Form submitted successfully!');
      } else {
        // Handle errors
        console.error('Form submission failed.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });
  }
});



function generatePDF(formData) {
    const doc = new jsPDF();
    const html = document.getElementById("container").innerHTML;
    doc.fromHTML(html, 15, 15);

    // Collect form data and add it to the PDF
    const formDataObj = {};
    for (const [key, value] of formData) {
        formDataObj[key] = value;
    }
    doc.text(10, 10, 'Form Data:');
    for (const key in formDataObj) {
        doc.text(10, 20, `${key}: ${formDataObj[key]}`);
    }

    doc.save("application-form.pdf");
}