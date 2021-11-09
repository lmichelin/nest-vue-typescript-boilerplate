<template>
  <div class="add-user-title">Add new user:</div>
  <div class="add-user-form-container">
    <form ref="addUserForm">
      <input
        class="add-user-input"
        v-model="user.email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        class="add-user-input"
        v-model="user.firstName"
        placeholder="First name"
      />
      <input
        class="add-user-input"
        v-model="user.lastName"
        placeholder="Last name"
      />
    </form>
    <button class="add-user-button" @click="addUser()">Add user</button>
    <div v-if="userCreationError">{{ userCreationError }}</div>
  </div>
</template>

<script lang="ts">
import apiClient from "@/network/apiClient";
import { CreateUserDto } from "@/types/user";
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "AddUser",
  emits: ["userAdded"],
  setup() {
    const addUserForm = ref<HTMLFormElement>();

    return { addUserForm };
  },
  data: (): { user: CreateUserDto; userCreationError: string } => ({
    user: {
      email: "",
      firstName: "",
      lastName: "",
    },
    userCreationError: "",
  }),
  methods: {
    addUser: async function () {
      if (!this.addUserForm) return;
      if (!this.addUserForm.checkValidity()) {
        this.addUserForm.reportValidity();
        return;
      }
      try {
        apiClient.createUser(this.user);
        this.$emit("userAdded");
        this.user = {
          email: "",
          firstName: "",
          lastName: "",
        };
      } catch (error) {
        this.userCreationError = "An error occured while creating new user.";
        console.error(error);
      }
    },
  },
});
</script>
<style scoped lang="scss">
.add-user-title {
  margin-bottom: 10px;
}
.add-user-form-container {
  display: flex;
  margin-bottom: 20px;
}
.add-user-input {
  margin-right: 10px;
  padding: 5px;
}
.add-user-button {
  cursor: pointer;
  padding: 5px;
}
</style>
