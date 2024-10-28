import { faker } from '@faker-js/faker';

const statuses = ['To Do', 'In Progress', 'Blocked', 'Done'];

const generateTicket = (id) => ({
  id, // Unique ID
  title: faker.commerce.productName(), // Random title
  description: faker.lorem.sentence(), // Random description
  status: statuses[Math.floor(Math.random() * statuses.length)] // Random status
});

export const ticketData = Array.from({ length: 10000 }, (_, index) => generateTicket(100000 + index));
