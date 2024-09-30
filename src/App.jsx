import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const WelcomeHeader = styled.h1`
  color: #333;
  text-align: center;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Routes>
          <Route path="/" element={<WelcomeHeader>Welcome to Invoice Generator  </WelcomeHeader>} />
          <Route path="/create" element={<InvoiceForm />} />
          <Route path="/preview" element={<InvoicePreview />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
