export const isUndefinedOrNullOrEmpty = (data) => {
    return data === undefined || data === null || data.trim() === '';
}

export const isUndefinedOrNull = (data) => {
    return data === undefined || data === null;
}

export const isNullOrEmpty = (data) => {
    return data === null || data.trim() === '';
}

export const validateProduct = async(data) => {
    let errorExists = false;
    let errors = {
    }
    if(isUndefinedOrNullOrEmpty(data.name)){
        errorExists = true;
        errors.name = 'Product name cannot be empty.'
    }
    if(isUndefinedOrNullOrEmpty(data.description)){
        errorExists = true;
        errors.description = 'Product description cannot be empty.';
    }
    if(isUndefinedOrNull(data.price) || data.price <= 0){
        errorExists = true;
        errors.price = 'Product price cannot be empty or negative or 0.'
    }
    if(!data.isDigital){
        //validate physical dimensions and weight of a non digital product
        if(isUndefinedOrNull(data.weight) || data.weight <= 0){
            errorExists = true;
            errors.weight = 'You must provide weight (in ounces) of a physical product.';
        }
        if(isUndefinedOrNull(data.length) || data.length <= 0){
            errorExists = true;
            errors.length = 'You must provide a length dimension of the packaging of a physical product.';
        }
        if(isUndefinedOrNull(data.height) || data.height <= 0){
            errorExists = true;
            errors.height = 'You must provide the height dimension of the packaging of a physical product.';
        }
        if(isUndefinedOrNull(data.width) || data.width <= 0){
            errorExists = true;
            errors.width = 'You must provide the width dimension of the packaging of a physical product.';
        }
        if(isUndefinedOrNull(data.isDeliverable)){
            errorExists = true;
            errors.isDeliverable = 'You must mark a physical product as either deliverable or non-deliverable.';
        }
    }else if(data.isDigital){
        if(isUndefinedOrNull(data.downloadsPermitted) || data.downloadsPermitted < 0){
            errorExists = true;
            errors.downloadsPermitted = 'You must provide the number of permitted downloads for a digital product.';
        }
        if(isUndefinedOrNull(data.file) || data.file === ''){
            errorExists = true;
            errors.file = 'You must provide the product file.';
        }
    }
    return{
        errors,
        errorExists
    };
}