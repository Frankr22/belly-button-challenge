// Function for building charts
function buildChart(id) {

  // load data from JSON file
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
    
  // extract the top 10 OTUs for the selected id
    var samples = data.samples;
    var filtered_samples = samples.filter(sample => sample.id === id);
    var otu_ids = filtered_samples[0].otu_ids.slice(0, 10);
    var sample_values = filtered_samples[0].sample_values.slice(0, 10);
    var otu_labels = filtered_samples[0].otu_labels.slice(0, 10);

    // create the bar chart using Plotly
    var trace = {
      x: sample_values,
      y: otu_ids.map(id => `OTU ${id}`),
      text: otu_labels,
      type: "bar",
      orientation: "h"
    };
    var layout = {
      title: "Top 10 OTUs per Individual",
      yaxis: {
        autorange: "reversed"
      }
    };
    Plotly.newPlot("bar", [trace], layout);

    // create the bubble chart using Plotly
    var trace = {
      x: filtered_samples[0].otu_ids,
      y: filtered_samples[0].sample_values,
      mode: 'markers',
      marker: {
        size: filtered_samples[0].sample_values,
        color: filtered_samples[0].otu_ids
      },
      text: filtered_samples[0].otu_labels,
    };

    var layout = {
      title: "Bubble Chart of all samples",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Sample Values"}
    };

    Plotly.newPlot("bubble", [trace], layout);
  
    // extract the metadata for the selected id
    var metadata = data.metadata;
    var filtered_metadata = metadata.filter(md => md.id == id);

    // select the #sample-metadata element
    var sampleMetadata = d3.select("#sample-metadata");

    // clear any existing metadata
    sampleMetadata.html("");

    // loop over the properties of the filtered metadata object and append a new element for each key-value pair
    Object.entries(filtered_metadata[0]).forEach(([key, value]) => {
      var newElement = sampleMetadata.append("div");
      newElement.html(`<strong>${key}:</strong> ${value}`);
    });

})};

// select the select element
var select = d3.select("#selDataset");

//load data from json file
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
// extract the list of ids from the data

  var ids = data.names;
  
  // add options to the select element
  ids.forEach(id => {
    var option = select.append("option");
    option.text(id);
  });
  
  // set the first ID as the default value
  select.property("value", ids[0]);
  
  // call the buildChart function with the first ID in the list as an argument
  buildChart(ids[0]);
});

// Define the optionChanged formula
function optionChanged(id) {
  buildChart(id);
}
