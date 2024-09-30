import axios from 'axios';

const API_URL = 'https://invoices-generator.p.rapidapi.com/generate-invoice';

export const generateInvoice = async (invoiceData) => {
  const options = {
    method: 'GET',
    url: API_URL,
    params: {
      number: invoiceData.number,
      buyer_company_name: invoiceData.buyer_company_name,
      buyer_tax_number: invoiceData.buyer_tax_number,
      buyer_vat_number: invoiceData.buyer_vat_number,
      buyer_address: invoiceData.buyer_address,
      seller_company_name: invoiceData.seller_company_name,
      seller_tax_number: invoiceData.seller_tax_number,
      seller_vat_number: invoiceData.seller_vat_number,
      seller_address: invoiceData.seller_address,
      seller_bank_name: invoiceData.seller_bank_name,
      seller_bank_account: invoiceData.seller_bank_account,
      services: JSON.stringify(invoiceData.services),
      tax: invoiceData.tax,
      shipping: invoiceData.shipping,
      service_fee: invoiceData.service_fee,
      currency: invoiceData.currency,
      date: invoiceData.date,
      due_date: invoiceData.due_date,
      logo: invoiceData.logo,
      locale: invoiceData.locale,
    },
    headers: {
      'X-RapidAPI-Key': '0e82335353msh06b998a0230b81ap1287d0jsn6fe55db4862d',
      'X-RapidAPI-Host': 'invoices-generator.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};