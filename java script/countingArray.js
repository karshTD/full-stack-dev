function countDistinctElements(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let distinctCount = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            distinctCount++;
        }
    }

    return distinctCount;
}

console.log(countDistinctElements([1, 2, 2, 3, 4, 4, 5]));

