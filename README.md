# Map Visualization

This project provides a simple map visualization tool that reads data from an Excel file and displays it on an SVG map using D3.js. The map supports displaying various types of icons representing different file types and includes tooltip functionality for detailed information about each data point.

![Map Visualization Screenshot](/image.png)
## Prerequisites

To use this tool, you need a modern web browser with JavaScript enabled. The following libraries are used:
- D3.js (v7)
- xlsx.js (v0.18.5)

These libraries are included via CDN in the HTML file.

## Usage

1. **Open the `index.html` file in a web browser**: This will load the page with a file input and an empty map area.
   
2. **Upload an Excel file**: Click on the file input button to select an Excel file from your local system. The file should contain a sheet with columns for "X coord", "Y coord", "Type", "Resource Name", and "Module ID".

3. **View the Visualization**: The data from the Excel file will be read and processed, then visualized on the map using D3.js. Icons representing different file types will be displayed at the corresponding coordinates.

## Data Format

The Excel file should contain the following columns:
- `X coord`: The x-coordinate for placing the icon on the map.
- `Y coord`: The y-coordinate for placing the icon on the map.
- `Type`: The type of resource, which determines the icon displayed. Supported types are "pdf", "docx", "mp4", "mp3", and "pptx".
- `Resource Name`: The name of the resource.
- `Module ID`: The ID of the module the resource belongs to.

## Customization

### Icons

The icons for different file types are defined in the `icons` object in `script.js`:
```javascript
const icons = {
    "pdf": "📄",
    "docx": "📃",
    "mp4": "🎥",
    "mp3": "🎵",
    "pptx": "📊"
};
