import React, { useEffect, useState } from "react";
import BlogPostingForm from "./components/BlogPostingForm/BlogPostingForm";
import BlogPostingList from "./components/BlogPostingList/BlogPostingList";
import { fetchAllBlogEntries } from './services/BlogService'


function App(){

    const [posts, setPosts] = useState([]);
    
    const [hasNewPost, setHasNewPost] = useState(false);
    const [parentSiteId, setParentSiteId] = useState('');

    useEffect(() => {
        if(hasNewPost == true){
            fetchAllBlogEntries(parentSiteId).then(res => {
                setPosts(res.items);
            })
            setHasNewPost(false);
        }
    }, [hasNewPost]);

    return(
        <>
            <h1>Blog App!</h1>
            <BlogPostingForm 
                setHasNewPost = {setHasNewPost} 
                setParentSiteId = {setParentSiteId}
            />
            <BlogPostingList posts={posts}/>
        </>
    )

}export default App;