class InvalidUrlError extends Error{
    constructor(){
        super("Invalid URL");
        this.name="InvalidURLError"
    }
}

class InvalidResponseStructureError extends Error{
    constructor(){
        super("Invalid Response Structure")
        this.name="InvalidResponseStructure"
    }
}

class ProductNotFoundError extends Error{
    constructor(){
        super("Products not found")
        this.name="ProductsNotFoundError"
    }
}

class InternalServerError extends Error{
    constructor(){
        super("Internal Server Error")
        this.name="InternalServerError"
    }
}

class FailedToFetchProductsError extends Error{
    constructor(){
        super("Failed to Fetch Product")
        this.name="FailedToFetchProductsError"
    }
}

class ContextError extends Error{
    constructor(){
        super("must be used within a provider")
        this.name="ContextError"
    }
}


export {
    InvalidUrlError,
    InvalidResponseStructureError,
    InternalServerError,
    FailedToFetchProductsError,
    ProductNotFoundError,
    ContextError
}