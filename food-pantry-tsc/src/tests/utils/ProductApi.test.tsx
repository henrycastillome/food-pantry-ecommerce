import { describe, expect, test } from "@jest/globals";
import ProductsApi from "../../utils/Products";
import MockAdapter from "axios-mock-adapter";
import axios, { AxiosInstance } from "axios";

describe('ProductAPI', ()=>{
    let mockAxios: any;
    beforeAll(()=>{
        mockAxios=new MockAdapter(axios)
    })

    afterAll(()=>{
        mockAxios.restore()
    })
    it("should fetch products successfully",async () => {
        const api=new ProductsApi("mocked_api_endpoint")
        mockAxios.onGet('mocked_api_endpoint').reply(200,{data:["product1", "product2"]})

        const products= await api.getAll()
        expect(products).toEqual(["product1", "product2"])
    })
})