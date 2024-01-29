const removeEmptyElements = (array) => {
    let result = [];
    for(let i = 0; i < array.length ; i++){
        if(array[i].length !== 0){
            result.push(array[i]);
        }
    }
    return result;
}

export default removeEmptyElements;