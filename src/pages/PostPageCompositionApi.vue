
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
      />
      </my-dialog>
      
      <post-list 
          :posts="sortedAndSearchedPosts"
          v-if="!isLoading"
      />
      <div v-else>Идет загрузка...</div>
    </div>
  </template>
  
  <script>
  import PostForm from '@/components/PostForm'
  import PostList from '@/components/PostList'
  import {usePosts} from '@/hooks/usePosts'
  import useSortedPosts from '@/hooks/useSortedPosts'
  import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
  import {ref} from 'vue'
  import axios from 'axios'
  export default {
      components: {
          PostForm, PostList
      },
      data() {
          return {
              dialogVisible: false,
              sortOptions:[ 
                  {value: 'title', name: 'По названию'},
                  {value: 'body', name: 'По содержимому'}
               ]
          }
      }, 
      setup(props) {
        const {posts, totalPages, isLoading} = usePosts(10)
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
        return {
            posts, 
            totalPages,
            isLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
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
  