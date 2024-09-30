import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { clearInvoice } from '../features/invoices/invoiceSlice';

const PreviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PreviewHeader = styled.h2`
  color: #333;
  text-align: center;
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  text-align: center;
  font-weight: bold;
`;

const LoadingMessage = styled.div`
  color: #007bff;
  text-align: center;
  font-weight: bold;
`;

const InvoicePreview = () => {
  const { data, status, error } = useSelector((state) => state.invoice);
  console.log("Data", data )
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status === 'loading') {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (status === 'failed') {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (!data || !data.url) {
    return <ErrorMessage>No invoice data available</ErrorMessage>;
  }

  const handleNewInvoice = () => {
    dispatch(clearInvoice());
    navigate('/create');
  };

  const handleDownload = () => {
    window.open(data.url, '_blank');
  };

  return (
    <PreviewContainer>
      <PreviewHeader>Invoice Preview</PreviewHeader>
      <PreviewFrame src={data.url} title="Invoice Preview" />
      <ButtonContainer>
        <Button onClick={handleNewInvoice}>Create New Invoice</Button>
        <Button onClick={handleDownload}>Download Invoice</Button>
      </ButtonContainer>
    </PreviewContainer>
  );
};

export default InvoicePreview;