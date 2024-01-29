const mergeArray = (array) => {
    let X = [];
    let Y = [];
    
    for(let i = 0; i < array.length; i++){
        X.push(...array[i][0]);
        Y.push(...array[i][1]);
    }

    return [X, Y];
}

export default mergeArray;