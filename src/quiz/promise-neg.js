function checkRowForNegative(arr, rowIdx) {
    return new Promise((resolve, reject) => {
        if (arr.length > rowIdx) {
            setTimeout(() => {
                const hasNegative = arr[rowIdx].some((num) => num < 0);
                if (hasNegative) {
                    resolve(rowIdx);
                } else {
                    //reject(`Row ${rowIdx} does not have negative numbers.`);
                    resolve();
                }
            }, 0);
        } else {
            reject(`Row Index ${rowIdx} must be within 0 and ${arr.length}`);
        }
    });
}

const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

const negativeRowPromises = array2D.map((_, x) => checkRowForNegative(array2D, x));

Promise.allSettled(negativeRowPromises)
    .then((results) => {
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                const rowIdx = result.value;
                if (rowIdx !== undefined) {
                    console.log(`Row ${rowIdx} has at least one negative number.`);
                }
            } else {
                console.log(`Error Msg: ${result.reason}`);
            }
        });
    });