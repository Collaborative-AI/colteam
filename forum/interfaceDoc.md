如果visible为false， 返回“content invisible”

1. create a new thread
create_thread(user_id, project_id, title)
return{
    id
    thread_id
    project(Object){

    }
    title(CharField)
    created_at(DateTimeField)
    tags(ManyToManyField)
    visible(BooleanField)
}      

2. create a new post
create_post(user_id, thread_id, content)
return{
    id
    thread(Object){

    }
    content(TextField)
    created_at(DateTimeField)
    user(Object){

    }
    visible(BooleanField)
}      

3. get_thread_by_threadId(thread_id)
return{
    id
    thread(Object){

    }
    content(TextField)
    created_at(DateTimeField)
    user(Object){

    }
    visible(BooleanField)
}   

4. delete_post(post_id)
return{
    id
    thread(Object){

    }
    content(TextField)
    created_at(DateTimeField)
    user(Object){

    }
    visible(BooleanField)
}  

5. get_post_by_postId(post_id)
return{
    id
    thread(Object){

    }
    content(TextField)
    created_at(DateTimeField)
    user(Object){

    }
    visible(BooleanField)
}  

6. get_posts_by_threadId(thread_id)
return{
    id
    thread(Object){

    }
    content(TextField)
    created_at(DateTimeField)
    user(Object){

    }
    visible(BooleanField)
}  

7. get_threads_by_projectId(project_id)
return{
    id
    project(Object){

    }
    title(CharField)
    created_at(DateTimeField)
    tags(ManyToManyField)
    visible(BooleanField)
}  

8. precise_search_by_title(search_term)
return{
    'form': SearchForm
    'results': Threads(Objects)
}

9. fuzzy_search_by_title(title_key_words)
return{
    'form': SearchForm
    'results': Threads(Objects)
}

10. add_tags(thread_id, tags)
return{
    id
    project(Object){

    }
    title(CharField)
    created_at(DateTimeField)
    tags(ManyToManyField)
    visible(BooleanField)
}  

11. remove_tags(thread_id, tags)
return{
    id
    project(Object){

    }
    title(CharField)
    created_at(DateTimeField)
    tags(ManyToManyField)
    visible(BooleanField)
}  


<!-- TODO: -->
//forum
<!-- 1. get_thread_by_postId() -->
<!-- 2. delete_thread() -->
3. edit_post_by_postId()
4. get_thread_by_tags()
5. add visible condition in all "get" functions: thread add thead, post add thread&post
6. add ordered by in "get" functions
7. like_thread()
8. like_post()
9. dislike_post()
10. add_thread_in_collector()
11. add thread view number function
12. add preview function
//user
13. add find user by username(@ function)
