<script setup lang="ts">
interface Props {
  media: string;
  email: string;
  fullName: string;
}
const props = defineProps<Props>()


</script>

<template>
  <div class="user-card">
    <img class="user-img" :src="props.media" alt="picture">
    <div class="user-info">
      <span class="user-name">{{ props.fullName }}</span>
      <a class="user-email" :href="`mailto:${props.mail}`">{{ props.email }}</a>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-name {
  font-size: 1.5rem;
  color: #333333;
  margin: 0;
}

.user-email {
  font-size: 0.9rem;
  color: #666666;
}

.user-location,
.user-phone {
  font-size: 0.9rem;
  color: #888888;
}
</style>
