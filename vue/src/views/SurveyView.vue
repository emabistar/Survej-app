<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1
          class="text-3xl font-bold text-gray-900"
        >{{ model.id ? model.title : "Create a Survey" }}
        </h1>
      </div>
    </template>
   
    <form @submit.prevent="saveSurvey" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="shadow-sm sm:rounded-md sm:overflow-hidden ">
        <div class="px-4 py-5 bg-white-50 space-y-6 sm:p-6">   
           <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input
                  type="file"
                  @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <!--/ Image -->

        </div>
          <!---End of first element-->
          <div>
            <!-- The title div--->
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                v-model="model.title"
                autocomplete="survey_title"
                class=" mt-1 p-3 focus:ring-indigo-500 bg-gray-50 focus:border-indigo-500 w-full pl-5 shadow-sm:text-sm border-gray-700 rounded-md"
              />
            </div>
          </div>
          <!-- The Description div--->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <div>
              <textarea
                row="3"
                name="description"
                id="description"
                v-model="model.description"
                autocomplete="survey_description"
                placeholder="Description"
                class="mt-1 focus:ring-indigo-500 p-3 bg-gray-50 focus:border-indigo-500 w-full pl-5 shadow-sm sm:text-sm border-gray-700 rounded-md"
              />
            </div>
          </div>

          <!-- The Expired date div--->
          <div>
            <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
            <div>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                
                v-model="model.expire_date"
                autocomplete="survey_expire_date"
                placeholder="Expire_date"
                class="mt-1 bg-gray-50 focus:ring-indigo-500 p-3 focus:border-indigo-500 w-full pl-5 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <!-- The Stutus div--->
            <!-- Status -->
          <div class="flex items-start p-5">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="model.status"
                class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700"
                >Active</label
              >
            </div>
          </div>
          <!--/ Status -->

             <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
               <h3 class="text-2xl font-semibold flex items-center justify-between" >
                 Questions 

                  <button
                  type="button"
                  @click="addQuestion()"
                  class="flex items-center py-1 rounded-md 
                  px-4 text-sm text-white bg-gray-600 hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="2"
                     d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                     />
                  </svg>
                  Add Questtion
                    </button>      
               </h3>
               <div v-if="!model.questions.length" class="text-center text-gray-600">
                 You don't have any questions created 
                 <pre>{{ model.questions }}</pre>
               </div>
               <div v-for="(question, index) in model.questions " :key="question.id">
                 <QuestionEditor
                  :question ="question"
                  :index="index"
                  @change="questionChange"
                  @addQuestion="addQuestion"
                  @deleteQuestion ="deleteQuestion"
                 
                />
               </div>
             </div>

              <!-- The Submit  div--->
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" class=" inline-flex justify-center py-2 px-4 border border-transparent
                shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
                </button>
              </div>
        </div>
     
    </form>
  </PageComponent>
</template>
<script setup>
import store from "../store";
import{v4 as uuidv4} from "uuid";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue"
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

// create an empty
let model = ref({
  title: "",
  status: false,
  description: null,
  imageUrl: null,
  expire_date: null,
  questions: [],
});

// Add Question
function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}
// Delete  question
function deleteQuestion(question){
  model.value.questions = model.value.questions.filter(
    (q)=> q!== question
  );

};

// Change Question
function changeQuestion(question){
  model.value.questions = model.value.questions.map((q)=>{
    if(q.id ===question.id){
      return  JSON.parse(JSON.stringify(question))
    }
    return q;
  });
};

if (route.params.id)
{
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
}

function saveSurvey(){
  store.dispatch('saveSurvey',model.value).then(({data}) =>{
 router.push({
   name:"SurveyView",
   params:{id:data.data.id},
 });
  });
}
</script>