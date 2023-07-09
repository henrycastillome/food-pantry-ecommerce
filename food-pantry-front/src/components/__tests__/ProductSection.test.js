import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxWithLabel from '../CheckboxWithLabel';
import ProductSection from '../ProductSection';
import { AuthProvider} from './context/AuthContext';
import { NewProvider } from './context/NewOrder';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});

it('Render component without crashing', ()=>{
    const mockProduct=[
        {item_id:58, item_name:"Shampoo", item_category:"Hygiene", item_quantity:85}
    ]
    render(
        <AuthProvider>
            <NewProvider value={{products:mockProduct}}>
            <ProductSection/>

            </NewProvider>
        </AuthProvider>
    )
    
})