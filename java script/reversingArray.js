function ReverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }  
    return arr;
}

console.log(ReverseArray([1, 2, 3, 4, 5]));
