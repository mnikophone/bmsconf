function printDataInRowsAndColumns(data) {
    // Number of rows is fixed at 5
    const numberOfRows = 5;

    // Determine the number of columns dynamically based on the size of the array
    const numberOfColumns = Math.ceil(data.length / numberOfRows);

    let rowIndex = 0;
    let currentDataIndex = 0;

    // Loop through each of the 5 rows
    for (let row = 0; row < numberOfRows; row++) {
        // Create an empty array for the current row
        let rowData = [];
        
        // Determine how many columns to fill in the current row
        for (let col = 0; col < numberOfColumns; col++) {
            // Check if there is more data to add to the row
            if (currentDataIndex < data.length) {
                rowData.push(data[currentDataIndex]);
                currentDataIndex++;
            }
        }

        // Print the row
        console.log(`Row ${row + 1}:`, rowData);
    }
}

// Example usage:
const data = [1, 2, 3, 4, 5,34,4,4,5,5,6,6,6,7,6,5,4,5,6,7,3,2,3,4,4,4,4,4,4,4,4,4,4];
printDataInRowsAndColumns(data);
