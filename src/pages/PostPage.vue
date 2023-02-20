
<template>
    <div>
      <h1>Страница с постами</h1>
      <my-input 
          v-model="searchQuery"
          placeholder="Поиск..."
          v-focus
      />
      <div class="app__btns">
          <my-button
          @click="showDialog"
          >
          Создать пост
          </my-button>
          <my-select
              v-model="selectedSort"
              :options="sortOptions"
          />
      </div>
      <my-dialog v-model:show="dialogVisible">
          <post-form
          @create="createPost"
      />
      </my-dialog>
      
      <post-list 
          :posts="sortedAndSearchedPosts"
          @remove="removePost"
          v-if="!isLoading"
      />
      <div v-else>Идет загрузка...</div>
      <div v-intersection="loadMorePosts"></div>
      <!-- <div class="page__wrapper">
          <div
              v-for="pageNumber in totalPages" 
              :key="pageNumber"
              class="page"
              :class="{
                  'current__page': page === pageNumber
              }"
              @click="changePage(pageNumber)"
          >{{ pageNumber }}</div>
      </div> -->
    </div>
  </template>
  
  <script>
  import PostForm from '@/components/PostForm'
  import PostList from '@/components/PostList'
  import axios from 'axios'
  export default {
      components: {
          PostForm, PostList
      },
      data() {
          return {
              posts: [],
              dialogVisible: false,
              isLoading: false,
              selectedSort: '',
              searchQuery: '',
              page: 1,
              limit: 10,
              totalPages: 0,
              sortOptions:[ 
                  {value: 'title', name: 'По названию'},
                  {value: 'body', name: 'По содержимому'}
               ]
          }
      },
      methods: {
          createPost (event) {
              this.posts.push(event);
              this.dialogVisible = false;
          },
          removePost(post) {
              this.posts = this.posts.filter(p => p.id !== post.id);
          },
          showDialog() {
              this.dialogVisible = true;
          },
          // changePage(pageNumber) {
          //     this.page = pageNumber
          // },
          async fetchPosts() {
              try {
                  this.isLoading = true
                  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                      params: {
                          _page: this.page,
                          _limit: this.limit
                      }
                  })
                  this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                  this.posts = response.data
              } catch (error) {
                  alert('Ошибка')
              } finally {
                  this.isLoading = false
              }
          },
          async loadMorePosts() {
              try {
                  this.page += 1
                  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                      params: {
                          _page: this.page,
                          _limit: this.limit
                      }
                  })
                  this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                  this.posts = [...this.posts, ...response.data]
              } catch (error) {
                  alert('Ошибка')
              } finally {
                  this.isLoading = false
              }
          }
      },
      mounted() {
          this.fetchPosts();
        //   const options = {
        //       rootMargin: '0px',
        //       threshold: 1.0
        //   }
        //   const callback = (entries, observer) => {
        //       if(entries[0].isIntersecting && this.page < this.totalPages) {
        //           this.loadMorePosts()
        //       }
        //   };
        //   const observer = new IntersectionObserver(callback, options);
        //   observer.observe(this.$refs.observer)
      },
      computed: {
          sortedPosts() {
              return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
          },
          sortedAndSearchedPosts() {
              return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
          }
      },
      watch: {
          // selectedSort(newValue) {
          //     this.posts.sort((post1, post2) => {
          //         return post1[newValue]?.localeCompare(post2[newValue])
          //     })
          // }
          // page() {
          //     this.fetchPosts()
          // }
      }
  }
  </script>
  
  <style>

      .app__btns {
          display: flex;
          justify-content: space-between;
          margin: 15px 0;
      }
      .page__wrapper {
          display: flex;
          margin-top: 15px;
      }
      .page {
          border: 1px solid black;
          padding: 10px;
      }
      .current__page {
         border: 2px solid green; 
      }
  
  </style>
  