
<template>
    <div>
         <!-- <h1>{{ $store.state.post.limit }}</h1> -->
        <!-- {{ $store.commit('post/setLoading') }}  -->
       <!-- <h1>{{ $store.state.isAuth ? 'Пользователь авторизован' : 'Авторизуйтесь' }}</h1>  -->
       <h1>Страница с постами</h1> 
       <!-- <h1>{{ $store.getters.doubleLikes }}</h1>  -->
       <!-- <div>
        <my-button @click="$store.commit('incrementLikes')">Like</my-button>
        <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
      </div>  -->
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
      <div class="page__wrapper">
          <div
              v-for="pageNumber in totalPages" 
              :key="pageNumber"
              class="page"
              :class="{
                  'current__page': page === pageNumber
              }"
              @click="changePage(pageNumber)"
          >{{ pageNumber }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import PostForm from '@/components/PostForm'
  import PostList from '@/components/PostList'
  import axios from 'axios'
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
      components: {
          PostForm, PostList
      },
      data() {
          return {
              dialogVisible: false,
          }
      },
      methods: {
        ...mapMutations ({
            setPage: 'post/setPage'
        }),
        ...mapActions ({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
        }),
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
      },
      mounted() {
        //   this.fetchPosts();
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
         ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
         }),
         ...mapGetters({
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts', 
            sortedPosts: 'post/sortedPosts'
         })
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
  