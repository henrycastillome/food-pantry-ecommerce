import { render, getByText, screen, act, renderHook } from "@testing-library/react"
import { useCustomerContext, CustomerProvider } from "../../context/CustomerContext";


describe("CustomerContext", () => {
    afterEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(window, 'sessionStorage', { writable: true, value: {} });
      });

    it("should render without crashing", () => {
        render(<CustomerProvider><div></div></CustomerProvider>)
    })

    it("should set customer state from sessionStorage", () => {
        const mockSessionStorage = {
            getItem: jest.fn().mockReturnValue(JSON.stringify({user_id: 1, user_name: "Diomedez", user_lname:"Diaz"})),
            setItem: jest.fn(),
        }
        Object.defineProperty(window, 'sessionStorage', {value:mockSessionStorage})
        render(<CustomerProvider><div></div></CustomerProvider>)
        expect(mockSessionStorage.getItem).toHaveBeenCalledWith('customer');
        expect(screen.getAllByText("")).toBeDefined();
    })

    it("should update sessionStorage when customer state changes", () => {
        const mockSessionStorage = {
            getItem: jest.fn().mockReturnValue(JSON.stringify({user_id: 1, user_name: "Diomedez", user_lname:"Diaz"})),
            setItem: jest.fn(),
        }
        

        Object.defineProperty(window, 'sessionStorage', {value:mockSessionStorage})

        render(
            <CustomerProvider>
                <div></div>
            </CustomerProvider>
          );

        const newCustomer = {user_id: 2, user_name: "Lionel", user_lname:"Messi"}
        act(()=>{
            mockSessionStorage.setItem('customer', JSON.stringify(newCustomer));
        })
        expect(mockSessionStorage.setItem).toHaveBeenCalledWith('customer', JSON.stringify(newCustomer));
    })

    it("should remove the user from sessionStorage when customer logout", () => {
        const mockSessionStorage = {
            getItem: jest.fn().mockReturnValue(JSON.stringify({user_id: 1, user_name: "Diomedez", user_lname:"Diaz"})),
            setItem: jest.fn(),
        }
        

        Object.defineProperty(window, 'sessionStorage', {value:mockSessionStorage})

        render(
            <CustomerProvider>
                <div></div>
            </CustomerProvider>
          );

        
        act(()=>{
            mockSessionStorage.setItem('customer', null);
        })
        expect(mockSessionStorage.setItem).toHaveBeenCalledWith('customer', null);
    })
})