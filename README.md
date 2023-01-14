# Belly Button Biodiversity Dashboard

This is an interactive web application that allows users to explore the Belly Button Biodiversity dataset. The dataset contains information about the microbial inhabitants of human navels.

## Features

The application allows users to select a test subject ID from a dropdown list and view the following interactive charts:
A bar chart of the top 10 OTUs (operational taxonomic units) found in the sample
A bubble chart of all the samples
The application also displays demographic information of the selected test subject ID including:
Age
Gender
Ethnicity
Location
BBType
WFreq
Technologies
The application is built using HTML, CSS, JavaScript, and D3.js, Plotly.js
The data is loaded from a JSON file hosted on an Amazon S3 bucket
Bootstrap is used for styling

## How to use

Clone the repository or download the zip file.
Open the index.html file in a web browser.
Select a test subject ID from the dropdown list on the left-hand side of the page.
The application will display the top 10 OTUs and demographic information for the selected ID, as well as the bubble chart of all the samples

## To run it locally
Make sure you have a web server running, you can use http-server, python -m http.server or other web servers
Once you have a web server running, you can access the application by navigating to http://localhost:<your-port-number>/ in your web browser

## Additional Notes
The application is not optimized for mobile devices, it's best viewed on a desktop or laptop.
The application uses a static dataset, if the data change the code will need to be updated accordingly.

## Contributing
If you want to contribute to this project, you can fork the repository and submit a pull request with your changes.

## Support
If you have any questions or issues, please open an issue in the repository.
