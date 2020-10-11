export const isUndefinedOrNullOrEmpty = (data) => {
    return data === undefined || data === null || data.trim() === '';
}

export const isUndefinedOrNull = (data) => {
    return data === undefined || data === null;
}

export const isNullOrEmpty = (data) => {
    return data === null || data.trim() === '';
}