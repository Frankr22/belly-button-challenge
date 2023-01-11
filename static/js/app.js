// Step 1: Read in the JSON data and parse it
const data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(data).then(function(data) {
  // Step 2: Create an array of objects, where each object represents an OTU
  var otus = data.samples.map(function(sample) {
    return {
      otu_id: sample.otu_ids,
      sample_value: sample.sample_values,
      otu_label: sample.otu_labels
    };
  });

  // Step 3: Sort the array of objects by sample_value, in descending order
  otus.sort(function(a, b) {
    return b.sample_value - a.sample_value;
  });

  // Print the sorted array of OTUs to the console to verify that it was sorted correctly
  console.log(otus);

  // Step 4: Create a dropdown menu with a list of all of the individuals
  var select = d3.select("#selDataset");

  select.selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
      .attr("value", function(d) { return d; })
      .text(function(d) { return d; });

  // Step 4a: Add an onchange event listener to the select element
  select.on("change", function() {
    // Get the selected individual from the dropdown menu
    var selectedIndividual = d3.select(this).property("value");
    optionChanged(selectedIndividual);
  });

  // Define the optionChanged function
  function optionChanged(selectedIndividual) {
    // Filter the array of OTUs to only include the top 10 for the selected individual
    var top10otus = otus.filter(function(otu) {
      return otu.otu_id.includes(selectedIndividual);
    }).slice(0, 10);

    // Update the bar chart with the new data
    var trace = {
      x: top10otus.map(function(otu) { return otu.sample_value; }),
      y: top10otus.map(function(otu) { return otu.otu_id; }),
      type: "bar",
      orientation: "h",
      text: top10otus.map(function(otu) { return otu.otu_label; })
    };

    var layout = {
      title: "Top 10 OTUs for Selected Individual",
      yaxis: {
        autorange: "reversed"
      }
    };

    Plotly.newPlot("bar", [trace], layout);
  }
});

