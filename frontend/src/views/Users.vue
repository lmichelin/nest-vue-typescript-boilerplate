<template>
  <h1>Users</h1>
  <AddUser @userAdded="fetchUsers()" />
  <UsersTable v-if="users.length" :users="users" @userDeleted="fetchUsers()" />
  <div v-if="usersLoadingError">{{ usersLoadingError }}</div>
</template>

<script lang="ts">
import UsersTable from "@/components/UsersTable.vue";
import AddUser from "@/components/AddUser.vue";
import { defineComponent } from "@vue/runtime-core";
import apiClient from "@/network/apiClient";
import { User } from "@/types/user";

export default defineComponent({
  name: "Users",
  components: {
    AddUser,
    UsersTable,
  },
  data: (): { users: User[]; usersLoadingError: string } => ({
    users: [],
    usersLoadingError: "",
  }),
  methods: {
    fetchUsers: async function () {
      try {
        const users = await apiClient.getUsers();
        this.users = users;
      } catch (error) {
        this.usersLoadingError = "An error occured while fetching users.";
        console.error(error);
      }
    },
  },
  mounted: function () {
    this.fetchUsers();
  },
});
</script>
