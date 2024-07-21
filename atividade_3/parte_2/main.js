const fs = require('fs');

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

fs.readFile('arq.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let numList = data.split('\n').map(Number);

    let startTimeBubbleSort = process.hrtime();
    bubbleSort([...numList]); // Create a copy of numList to avoid modifying the original
    let endTimeBubbleSort = process.hrtime(startTimeBubbleSort);

    let startTimeQuickSort = process.hrtime();
    quickSort([...numList]); // Create a copy of numList to avoid modifying the original
    let endTimeQuickSort = process.hrtime(startTimeQuickSort);

    let executionTimeBubbleSort = endTimeBubbleSort[0] * 1000 + endTimeBubbleSort[1] / 1000000;
    let executionTimeQuickSort = endTimeQuickSort[0] * 1000 + endTimeQuickSort[1] / 1000000;

    console.log(`Bubble-Sort: ${executionTimeBubbleSort} milliseconds`);
    console.log(`Quick-Sort: ${executionTimeQuickSort} milliseconds`);
});
