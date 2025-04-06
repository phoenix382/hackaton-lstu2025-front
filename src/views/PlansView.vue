<template>

  <div class="main-content">
    <h1>Планы пользователя</h1>

    <div class="plans-content">      
      <div class="cool-image">
        <img class="back-image" src="@/assets/cool-image.png"/>
      </div>
      <div  class="plans">
        <div class="plan-list">
          <div 
            v-for="plan in plans.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
            :key="plan.id" 
            :class="{ 'plan': true, 'active': plan.id === currentPlan }"
          >
            <div class="plan-header">
              <h2>{{ plan.name }}</h2>
              <p>{{ plan.desc }}</p>
            </div>

            <!-- change, remove, select, share -->
            <div class="plan-buttons">
              <el-button type="primary">
                <i class="pi pi-check"></i>
                <span>
                  Выбрать
                </span>
              </el-button>

              <el-button type="primary" @click="editPlan(plan.id)">
                <i class="pi pi-pencil"></i>
                <span>
                  Редактировать
                </span>
              </el-button>

              <el-button type="primary">
                <i class="pi pi-share-alt"></i>
              </el-button>

              <el-button type="danger">
                <i class="pi pi-trash"></i>
              </el-button>
            </div>
          </div>
        </div>

        <el-pagination
          :page-size="pageSize"
          :pager-count="pagerCount"
          layout="prev, pager, next"
          :total="plans.length"
          v-model:current-page="currentPage"
        />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import { ElMessage } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();

const plans = ref([
  { id: 12, name: 'Недельный курс 02.05.2024', desc: 'описание курса некоторой длины'},
  { id: 13, name: 'Недельный курс 03.05.2024', desc: 'описание курса некоторой длины'},
  { id: 14, name: 'Недельный курс 04.05.2024', desc: 'описание курса некоторой длины'},
  { id: 15, name: 'Недельный курс 05.05.2024', desc: 'описание курса некоторой длины'},
  { id: 16, name: 'Недельный курс 06.05.2024', desc: 'описание курса некоторой длины'},
  { id: 17, name: 'Недельный курс 07.05.2024', desc: 'описание курса некоторой длины'},
  { id: 18, name: 'Недельный курс 08.05.2024', desc: 'описание курса некоторой длины'},
  { id: 19, name: 'Недельный курс 09.05.2024', desc: 'описание курса некоторой длины'},
  { id: 20, name: 'Недельный курс 10.05.2024', desc: 'описание курса некоторой длины'},
  { id: 21, name: 'Недельный курс 11.05.2024', desc: 'описание курса некоторой длины'},
  { id: 22, name: 'Недельный курс 12.05.2024', desc: 'описание курса некоторой длины'},
  { id: 23, name: 'Недельный курс 13.05.2024', desc: 'описание курса некоторой длины'},
  { id: 24, name: 'Недельный курс 14.05.2024', desc: 'описание курса некоторой длины'}
]);
const currentPlan = ref( 15 );

const pageSize = 5;
const pageCount = ref(Math.ceil(plans.value.length / pageSize));

const currentPage = ref(1);

const editPlan = (id) => {
  router.push(`/plan/${id}`);
};

</script>

<style scoped>
.back-image{
  height: 400px;
}

.main-content {
  display: flex; 
  flex-direction: column;
  gap: 1em;
  align-items: center;
  position: relative;
}

.plans-content {
  display: flex;
  gap: 5em;
}

.plans {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin-top: 2em;
  min-height: 460px;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
}

.plan {
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 0.3em;
}

.plan-buttons {
  display: flex;
  gap: 0.2em;
}

.manage-button {
  position: absolute;
  top: 0;
  right: 0;
}

.el-button span {
  margin-left: 0.5em;
}

.active {
  background-color: #026670;
  border: 1px solid #026670;
  border-radius: 5px;
  box-shadow: 0 0 5px 8px #9FEDD7;

  color: #026670;
}

</style>