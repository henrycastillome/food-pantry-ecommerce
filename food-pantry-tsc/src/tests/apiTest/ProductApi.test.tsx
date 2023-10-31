import axios from "axios";
import ProductsApi from "../../api/ProductsApi";
import MockAdapter from "axios-mock-adapter";
import { InvalidUrlError, ProductNotFoundError } from "../../errors/Errors";

const mockAxios = new MockAdapter(axios);

describe("ProductApi", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should create an instance of ProductApi with a valid URL", () => {
    const validUrl = "https://testingExample.com/api/products";
    const api = new ProductsApi(validUrl);
    expect(api).toBeInstanceOf(ProductsApi);
  });

  it("should create a invalidUrl error if the URL is not valid ", () => {
    const invalidUrl = "InvalidUrl";
    expect(() => new ProductsApi(invalidUrl)).toThrowError(InvalidUrlError);
  });

  it("it should handle succesful product retrieval", async () => {
    const validUrl = "https://testingExample.com/api/products";
    const api = new ProductsApi(validUrl);
    const mockProduct = {
      data: {
        products: [
          {
            item_id: 42,
            item_name: "ToiletPaper",
            item_category: "Hygiene",
            item_quantity: 48,
          },
        ],
      },
    };

    mockAxios.onGet(validUrl).reply(200, mockProduct);

    const products = await api.getAll();

    expect(products).toEqual(mockProduct.data);
  });

  it("it should throw a 404 error of product not found",async ()=>{
    const validUrl = "https://testingExample.com/api/products";
    const api = new ProductsApi(validUrl);
    
    mockAxios.onGet(validUrl).reply(404, "Not found")

    await expect(api.getAll()).rejects.toThrowError(ProductNotFoundError)
  })
});
