<template>
  <v-container>
    <div>
      <h4 class="display-1">Accounts</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="accounts"
      >
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "Accounts",
  data: function() {
    return {
      headers: [
        { text: "Email", value: "email" },
        { text: "First", value: "firstName" },
        { text: "Last", value: "lastName" }
      ],
      accounts: []
    };
  },
  mounted: function() {
    axios.get("/accounts").then(response => {
      this.accounts = response.data.map(account => ({
        email: account.email,
        firstName: account.firstname,
        lastName: account.lastname
      }));
    });
  }
};
</script>
