const updateXY = (X, Y, SR, G93Coordinate) => {
    SR.map((SR) => {
        const iteration = X.length;
        if(SR[1] == 'X'){
            for(let i = 1; i < SR[0]; i++){
                for(let j = 0; j < iteration; j++){
                    X.push(X[j] + i * SR[2]);
                    Y.push(Y[j]);
                }
            }
        }else{
            for(let i = 1; i < SR[0]; i++){
                for(let j = 0; j < iteration; j++){
                    X.push(X[j]);
                    Y.push(Y[j] + i * SR[2]);
                }
            }
        }
    });
    let modX = X.map(x => {
        return x+=G93Coordinate[0];
    });
    let modY = Y.map(y => {
        return y+=G93Coordinate[1];
    });
    return [modX, modY];
}

export default updateXY;