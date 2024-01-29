const toProgram = (updatedCoor, dia) => {
    let content = '';
    for(let i = 0; i < updatedCoor[0].length; i++){
        content += `addCircle(${updatedCoor[0][i]}, ${updatedCoor[1][i]}, ${dia/2});`;
    }
    return 'include("simple.js");' + content;
}

export default toProgram;