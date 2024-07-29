import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import fetchMocks from 'jest-fetch-mock';

fetchMocks.enableMocks();
// import { http, HttpResponse } from 'msw';
// import { setupServer } from 'msw/node';

// const handlers = [
//   http.get(`${process.env.NEXT_PUBLIC_URL}/api/nav`, () => {
//     return HttpResponse.json([]);
//   }),
// ];

// const server = setupServer(...handlers);

// server.listen();
