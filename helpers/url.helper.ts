export const queryParamsToObject = (queryString: string) => {
    const params = new URLSearchParams(queryString);
    const obj : any = {};
    
    for (const [key, value] of params.entries()) {
        obj[key] = value;
    }
    
    return obj;
}


export const objectToQueryParams = (_object: any) => {
    return new URLSearchParams(_object).toString()
}