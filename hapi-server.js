// Standard Node modules
const Path = require("path");

// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "ui-spa"
  }
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const Account = require("./models/Account");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "dist")
    }
  }
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true
    }
  });

  // Configure static file service.
  await server.register(require("@hapi/inert"));

  // Configure routes.
  server.route([
    {
      method: "POST",
      path: "/accounts",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string().required()
          })
        }
      },
      handler: async (request, h) => {
        let resultSet = await knex("accounts")
          .select()
          .where("email", request.payload.email);
        if (resultSet.length > 0) {
          return {
            ok: false,
            msge: `The account '${request.payload.email}' is already in use`
          };
        }

        let result = await knex("accounts").insert({
          firstname: request.payload.firstName,
          lastname: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password
        });

        if (result.rowCount === 1) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't add '${request.payload.email}' to the database`
          };
        }
      }
    },

    {
      method: "GET",
      path: "/accounts",
      config: {
        description: "Retrieve all accounts"
      },
      handler: async (request, h) => {
        return Account.query();
      }
    },

    {
      method: "GET",
      path: "/public/{param*}",
      config: {
        description: "Static files"
      },
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
          index: true
        }
      }
    }
  ]);

  // Start the server.
  await server.start();
}

process.on("unhandledRejection", err => {
  server.logger().error(err);
  process.exit(1);
});

// Go!
init();
