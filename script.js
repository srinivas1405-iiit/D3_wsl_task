document.getElementById('file-input').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet is the one we want
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the worksheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Visualize the data using D3.js
        visualizeData(json);
    };

    reader.readAsArrayBuffer(file);
}

function visualizeData(data) {
    // Define SVG dimensions
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Create SVG element
    const svg = d3.select("#map")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for coordinates
    const xScale = d3.scaleLinear()
                     .domain([0, 1])
                     .range([0, width]);

    const yScale = d3.scaleLinear()
                     .domain([0, 1])
                     .range([height, 0]); // Flip y-axis

    // Define icons for file types
    const icons = {
        "pdf": "📄",
        "docx": "📃",
        "mp4": "🎥",
        "mp3": "🎵",
        "pptx": "📊"
    };

    // Add x-axis
    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append("g")
       .call(d3.axisLeft(yScale));

    // Add tooltip element
    const tooltip = d3.select("#tooltip");

    // Add icons to the SVG
    svg.selectAll(".icon")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "icon")
        .attr("x", d => xScale(d["X coord"]))
        .attr("y", d => yScale(d["Y coord"]))
        .attr("font-size", "24px")
        .text(d => icons[d.Type])
        .on("mouseover", function(event, d) {
            tooltip
                .style("opacity", 1)
                .html(`Resource Name: ${d["Resource Name"]}<br>Module ID: ${d["Module ID"]}<br>X: ${d["X coord"]}<br>Y: ${d["Y coord"]}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });
}
