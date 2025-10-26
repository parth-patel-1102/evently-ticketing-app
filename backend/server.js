import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import dotenv from "dotenv";
import { buildSchema } from "graphql";
import { pool } from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// GraphQL schema
const schema = buildSchema(`
  type Event {
    id: ID!
    title: String!
    location: String!
    event_date: String!
  }

  type Query {
    events: [Event]
  }

  type Mutation {
    createEvent(title: String!, location: String!, event_date: String!): Event
  }
`);

const resolvers = {
  events: async () => {
    const res = await pool.query("SELECT * FROM events");
    return res.rows;
  },
  createEvent: async ({ title, location, event_date }) => {
  const res = await pool.query(
    "INSERT INTO events (title, location, event_date) VALUES ($1, $2, $3) RETURNING event_id AS id, title, location, event_date",
    [title, location, event_date]
  );
  return res.rows[0];
},

};

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

// Simple test route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
