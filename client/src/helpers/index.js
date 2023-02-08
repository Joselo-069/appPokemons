export const convertStat = (stat) =>{
    const result = stat/10;
    return result;
}

export const convert500 = (stat) => {
    const result = stat/5;
    return result
}

export const convert150 = (stat) => {
    const result = 2*stat/3;
    return result
}


// const converPaginate = (paginate,byPage) => {
//     return (paginate -1) * byPage, (paginate -1) * byPage + byPage;
// }

// export default convertStat;