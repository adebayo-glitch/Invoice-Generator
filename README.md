# Invoice Generator

This is an Invoice Generator application built with React, Redux Toolkit, and Vite. It uses the Rapid API Invoice Generator to create professional invoices.

## Technologies Used

- React: A JavaScript library for building user interfaces
- Redux Toolkit: The official, opinionated, batteries-included toolset for efficient Redux development
- Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects
- Axios: Promise based HTTP client for the browser and node.js
- React Router: Declarative routing for React applications

## Approach

This application follows a modular approach with the following structure:

- Components: Reusable React components (Navigation, InvoiceForm, InvoicePreview)
- Features: Redux slices and API calls related to invoices
- Utils: Utility functions for local storage operations

The application uses Redux Toolkit for state management and React Router for navigation. It interacts with the Rapid API Invoice Generator to create invoices and stores the generated invoice data in local storage.

## Live Site

[Link to the live site will be added once deployed]

To generate an invoice:
1. Go to the "Create Invoice" page
2. Fill out the invoice form
3. Click "Generate Invoice"
4. View the generated invoice in the preview page

## Unsolved Problems

- Implement user authentication for secure access to invoice data
- Add functionality to edit and delete existing invoices
- Improve error handling and user feedback
