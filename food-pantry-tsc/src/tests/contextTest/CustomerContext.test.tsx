import { render, getByText, screen } from "@testing-library/react"
import { CustomerProvider } from "../../context/CustomerContext"


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
})