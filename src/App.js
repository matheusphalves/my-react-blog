import React, { useState } from "react";
import BlogPostingForm from "./components/BlogPostingForm/BlogPostingForm";
import BlogPostingList from "./components/BlogPostingList/BlogPostingList";
import { getSingleBlogEntryById } from './services/BlogService';


function App(){

    const [posts, setPosts] = useState([]);
    const [postToUpdate, setPostToUpdate] = useState(null);

    const getUpdatedPostById = (postId) => {
        getSingleBlogEntryById(postId).then(postUpdated => {
            const filteredPosts = filterPostsWichNotContainsId(postId)
            setPosts([...filteredPosts, postUpdated]);
        }).catch((error) => {
            console.log(error);
        })
    }

    const removePostById = (postId) => {
        const filteredPosts = filterPostsWichNotContainsId(postId)
        setPosts(filteredPosts);
    }

    const filterPostsWichNotContainsId = (postId) => {
        return posts.filter((post) => {
            if(post.id != postId){
                return post;
            }
        })
    }


    return (
        <>
            <h1>Blog App!</h1>
            <div className="row">
                <div className="col-5">
                    <div>
                        <BlogPostingForm
                            onSavePost={(savedPost) => setPosts([...posts, savedPost])}
                            onUpdatePost={(postId) => {
                                getUpdatedPostById(postId)
                            }}
                            postToUpdate={postToUpdate}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                        <BlogPostingList
                            posts={posts}
                            setPostToUpdate={setPostToUpdate}
                            onDeletePost={(postId) => removePostById(postId)}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}export default App;