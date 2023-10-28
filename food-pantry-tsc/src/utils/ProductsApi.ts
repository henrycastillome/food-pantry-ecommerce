import axios from "axios"
import { InvalidResponseStructureError, InvalidUrlError, ProductNotFoundError,
 FailedToFetchProductsError, InternalServerError} from "./Errors"; 

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

    async getRandomSixItems() {
        try {
          const data = await this.getAll();
          if (Array.isArray(data) && data.length > 0) {
            // Shuffle the data to get truly random items
            const shuffledData = this.shuffleArray(data);
            // Return the first 6 items from the shuffled data
            return shuffledData.slice(0, 6);
          } else {
            throw new ProductNotFoundError();
          }
        } catch (error) {
          throw new FailedToFetchProductsError();
        }
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

    private shuffleArray(array: any[]) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    }




export default ProductsApi;
