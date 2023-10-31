import axios from "axios"
import { InvalidResponseStructureError, InvalidUrlError, ProductNotFoundError,
 FailedToFetchProductsError, InternalServerError} from "../errors/Errors"; 

class ProductsApi{
    private api:string;

    constructor(api: string){
        if(!this.isValidUrl(api)){
            throw new InvalidUrlError()
        }
        this.api=api
    }

    async getAll(){
       
        try{
            const response= await axios.get(this.api, {timeout:5000})
            if(response.data && response.data.data){
                return response.data.data
            } else{
                throw new InvalidResponseStructureError()
            }

            

        } catch(error:any){
            this.handleErrorReponse(error)
            return {error: "Failed to fetch products"}
        };
    }

 


    private isValidUrl(url:string):boolean {
        try{
            new URL(url)
            return true
        } catch(error){
            return false
        }
    }

    private handleErrorReponse(error:any):void{
        if(error.response){
            if(error.response.status === 404){
                throw new ProductNotFoundError()
            } else if(error.response.status === 500){
                throw new InternalServerError()
            } else{
                throw new FailedToFetchProductsError()
            }
            
        }
    }


    }




export default ProductsApi;
