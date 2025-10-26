import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Event {
    id: ID!
    name: String!
    date: String!
    location: String!
  }

  type Query {
    events: [Event]
  }

  type Mutation {
    createEvent(name: String!, date: String!, location: String!): Event
  }
`);

const events = [];

export const root = {
  events: () => events,
  createEvent: ({ name, date, location }) => {
    const newEvent = { id: events.length + 1, name, date, location };
    events.push(newEvent);
    return newEvent;
  },
};

export default schema;
