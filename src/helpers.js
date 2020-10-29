export const isUndefinedOrNullOrEmpty = (data) => {
    return data === undefined || data === null || data.trim() === '';
}

export const isUndefinedOrNull = (data) => {
    return data === undefined || data === null;
}

export const isNullOrEmpty = (data) => {
    return data === null || data.trim() === '';
}

export const validateProduct = (data) => {
    let errorExists = false;
    let errors = {
    }
    if(!data.isDigital){
        //validate physical dimensions and weight of a non digital product
        if(isUndefinedOrNullOrEmpty(data.weight)){
            errorExists = true;
            errors.weight = 'You must provide weight (in ounces) of a physical product.';
        }
        if(isUndefinedOrNullOrEmpty(data.length)){
            errorExists = true;
            errors.length = 'You must provide a length dimension of the packaging of a physical product.';
        }
        if(isUndefinedOrNullOrEmpty(data.height)){
            errorExists = true;
            errors.height = 'You must provide the height dimension of the packaging of a physical product.';
        }
        if(isUndefinedOrNullOrEmpty(data.width)){
            errorExists = true;
            errors.width = 'You must provide the width dimension of the packaging of a physical product.';
        }
        if(isUndefinedOrNullOrEmpty(data.isDeliverable)){
            errorExists = true;
            errors.isDeliverable = 'You must mark a physical product as either deliverable or non-deliverable.';
        }
        return {
            errorExists,
            errors
        }
    }else if(data.isDigital){
        if(isUndefinedOrNullOrEmpty(data.downloadsPermitted)){
            errorExists = true;
            errors.downloadsPermitted = 'You must provide the number of permitted downloads for a digital product.';
        }
        return{
            errors,
            errorExists
        };
    }
}