/*
Welcome to Keystone! This file is what keystone uses to start the app.
It looks at the default export, and expects a Keystone config object.
You can find all the config options in our docs here: 
  https://keystonejs.com/docs/apis/config
*/

import { config } from "@keystone-6/core";
import { PORT, DATABASE_URL } from "./config";

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from "./schema";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    /*
      Postgres Setup for Railway.
    */
    db: {
      provider: "postgresql",
      url: DATABASE_URL,
      onConnect: async (context) => {
        /* ... */
      },
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: true,
      idField: { kind: "uuid" },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: { port: PORT }, // very important for railway to know what port to listen on
    lists,
    session,
  })
);
