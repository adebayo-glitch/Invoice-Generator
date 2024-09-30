import { useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInvoice } from '../features/invoices/invoiceSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 10px;
  text-align: center;
`;


function InvoiceForm() {
  const [formData, setFormData] = useState({
    number: "",
    buyer_company_name: "",
    buyer_tax_number: "",
    buyer_vat_number: "",
    buyer_address: "",
    seller_company_name: "",
    seller_tax_number: "",
    seller_vat_number: "",
    seller_address: "",
    seller_bank_name: "",
    seller_bank_account: "",
    services: [{ name: "", price: "", units: "", discount: "", quantity: "" }],
    tax: "",
    shipping: "",
    service_fee: "",
    currency: "USD",
    date: "",
    due_date: "",
    logo: "https://cdn.logo.com/hotlink-ok/logo-social.png",
    locale: "en",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.invoice);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, e) => {
    const updatedServices = formData.services.map((service, i) => {
      if (i === index) {
        return { ...service, [e.target.name]: e.target.value };
      }
      return service;
    });
    setFormData({ ...formData, services: updatedServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(fetchInvoice(formData));
    if (fetchInvoice.fulfilled.match(resultAction)) {
      navigate('/preview');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <h3>Create Your Invoice</h3>
      <Input
        type="text"
        name="number"
        value={formData.number}
        onChange={handleChange}
        placeholder="Invoice Number"
        required
      />
      <Input
        type="text"
        name="buyer_company_name"
        value={formData.buyer_company_name}
        onChange={handleChange}
        placeholder="Buyer Company Name"
        required
      />
      <Input
        type="text"
        name="buyer_tax_number"
        value={formData.buyer_tax_number}
        onChange={handleChange}
        placeholder="Buyer Tax Number"
        
      />
      <Input
        type="text"
        name="buyer_vat_number"
        value={formData.buyer_vat_number}
        onChange={handleChange}
        placeholder="Buyer VAT Number"
        
      />
      <Input
        type="text"
        name="buyer_address"
        value={formData.buyer_address}
        onChange={handleChange}
        placeholder="Buyer Address"
      
      />
      <Input
        type="text"
        name="seller_company_name"
        value={formData.seller_company_name}
        onChange={handleChange}
        placeholder="Seller Company Name"
        required
      />
      <Input
        type="text"
        name="seller_tax_number"
        value={formData.seller_tax_number}
        onChange={handleChange}
        placeholder="Seller Tax Number"
        
      />
      <Input
        type="text"
        name="seller_vat_number"
        value={formData.seller_vat_number}
        onChange={handleChange}
        placeholder="Seller VAT Number"
        
      />
      <Input
        type="text"
        name="seller_address"
        value={formData.seller_address}
        onChange={handleChange}
        placeholder="Seller Address"
        
      />
      <Input
        type="text"
        name="seller_bank_name"
        value={formData.seller_bank_name}
        onChange={handleChange}
        placeholder="Seller Bank Name"
        
      />
      <Input
        type="text"
        name="seller_bank_account"
        value={formData.seller_bank_account}
        onChange={handleChange}
        placeholder="Seller Bank Account"
        
      />

      <h3>Services</h3>
      {formData.services.map((service, index) => (
        <div key={index}>
          <Input
            type="text"
            name="name"
            value={service.name}
            onChange={(e) => handleServiceChange(index, e)}
            placeholder="Service Name"
            required
          />
          <Input
            type="number"
            name="price"
            value={service.price}
            onChange={(e) => handleServiceChange(index, e)}
            placeholder="Price"
            required
          />
          <Input
            type="text"
            name="units"
            value={service.units}
            onChange={(e) => handleServiceChange(index, e)}
            placeholder="Units"
            required
          />
          <Input
            type="number"
            name="discount"
            value={service.discount}
            onChange={(e) => handleServiceChange(index, e)}
            placeholder="Discount"
            required
          />
          <Input
            type="number"
            name="quantity"
            value={service.quantity}
            onChange={(e) => handleServiceChange(index, e)}
            placeholder="Quantity"
            required
          />
        </div>
      ))}

      <Input
        type="number"
        name="tax"
        value={formData.tax}
        onChange={handleChange}
        placeholder="Tax"
        required
      />
      <Input
        type="number"
        name="shipping"
        value={formData.shipping}
        onChange={handleChange}
        placeholder="Shipping Fee"
      />
      <Input
        type="number"
        name="service_fee"
        value={formData.service_fee}
        onChange={handleChange}
        placeholder="Service Fee"
      />
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Invoice Date"
        required
      />
      <Input
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        placeholder="Due Date"
      />

<Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Generating...' : 'Generate Invoice'}
      </Button>
      {status === 'failed' && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
}

export default InvoiceForm;
