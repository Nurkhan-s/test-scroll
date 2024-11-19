<script lang="ts" setup>

import {onMounted, onBeforeUnmount, ref, watch} from "vue";
import {ApiResponse} from "./services/api/types";
import {api} from "./services/api";
import Spinner from "./components/Spinner.vue";
import UserCard from "./components/UserCard.vue";

const variant = ref('observer');

/**
 * A reactive variable that holds the user data retrieved from the API.
 * It starts as `null` and is updated with data of type `ApiResponse` when available.
 *
 * @type {import('vue').Ref<ApiResponse | null>}
 */

const users = ref<ApiResponse | null>(null);

/**
 * A reactive variable indicating whether data is being loaded.
 * It's `true` during an ongoing API request and `false` when no request is in progress.
 *
 * @type {import('vue').Ref<boolean>}
 */

const isLoading = ref(false);

/**
 * Fetches user data from the API and updates the `users` reactive variable.
 *
 * @async
 * @param {number} page - The page number to fetch data for.
 * @param {number} results - The number of results to fetch per page.
 * @returns {Promise<void>} - A promise that resolves when the user data is successfully fetched and updated.
 *
 * @description
 * This function retrieves user data from the API based on the provided `page` and `results` parameters.
 * If no data is currently loaded in `users`, it initializes the variable with the fetched data.
 * Otherwise, it appends the new results to the existing `users.results` array and increments the current page.
 * The `isLoading` reactive variable is used to prevent overlapping API calls.
 *
 * @throws {Error} Logs an error to the console if the API request fails.
 */

const fetchUsers = async (page, results) => {
  isLoading.value = true
  try {
    await api.getUsers(page, results).then((data) => {
      if (!users.value) {
        users.value = data
      } else {
        users.value.results.push(...data.results);
        users.value.info.page++;
      }
    })
  } catch (e) {
    console.error('while fetchUsers', e);
  } finally {
    isLoading.value = false;
  }
}

const onScroll = async (event: Event) => {

  if (isLoading.value) return

  const target = event.target as HTMLDivElement;
  const height = +(target.scrollHeight - target.scrollTop).toFixed()

  if ([height, height + 1, height - 1].includes(event.target.clientHeight)) {
    const page = users.value.info.page + 1
    await fetchUsers(page)
  }
}


const scrollAbleEl = ref<HTMLDivElement | null>(null);
const loadMoreTrigger = ref<HTMLDivElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const initObserver = () => {
  observer.value = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && users.value) {
        const page = users.value.info.page + 1
        await fetchUsers(page)
      }
    }
  },
    {
      root: scrollAbleEl.value,
      threshold: 0.1,
      rootMargin: '5px',
  });

  observer.value?.observe(loadMoreTrigger.value);
};


/**
 * Retrieves the initial set of user data when the component is mounted.
 *
 * @returns {void}
 *
 * @description
 * When the component loads, this function makes an API call to get the initial
 * user list and assigns it to the `users` reactive variable.
 */

onMounted(() => {
  fetchUsers();
  if (variant.value === 'observer') {
    initObserver();
  }
})

</script>

<template>
  <div>
    <div class="switcher">
      <h1>Toggle variants</h1>
      <button
        :class="{ active: variant === 'scroll' }"
        @click="variant = 'scroll'">
        Scroll
      </button>
      <button
        :class="{ active: variant === 'observer' }"
        @click="variant = 'observer'">
        Observer
      </button>
    </div>
    <div v-if="variant === 'scroll'">
      <div class="users" @scroll="onScroll">
        <div class="users-wrapper" v-if="users">
          <h3>Scroll</h3>
          <UserCard
            v-for="user of users.results"
            :key="user.login.uuid"
            :fullName="`${user.name.first} ${user.name.last}`"
            :media="user.picture.medium"
            :email="user.email"
          />
          <div v-if="isLoading" class="users-spinner">
            <Spinner/>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="users" ref="scrollAbleEl">
        <div class="users-wrapper" v-if="users">
          <h3>Observer</h3>
          <UserCard
            v-for="user of users.results"
            :key="user.login.uuid"
            :fullName="`${user.name.first} ${user.name.last}`"
            :media="user.picture.medium"
            :email="user.email"
          />
          <div v-if="isLoading" class="users-spinner">
            <Spinner/>
          </div>
        </div>
        <div class="sentinel" ref="loadMoreTrigger">
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
.users {
  height: 800px;
  overflow-y: auto;
  padding: 50px;
}
.users-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.users-spinner {
  width: 50px;
  height: 50px;
}

.sentinel {
  height: 1px;
  width: 100%;
}


.switcher button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: background-color 0.3s, color 0.3s;
}

.switcher button.active {
  background-color: #007bff;
  color: white;
}

.switcher button:hover:not(.active) {
  background-color: #e0e0e0;
}
</style>
