import React, { useEffect, useState } from "react";
import CreateBlogPostingForm from "./components/CreateBlogPostingForm/CreateBlogPostingForm";
import UpdateBlogPostingForm from "./components/UpdateBlogPostingForm/UpdateBlogPostingForm";
import BlogPostingList from "./components/BlogPostingList/BlogPostingList";
import { fetchAllBlogEntries } from './services/BlogService';
import ClayButton from '@clayui/button';


function App(){

    const [parentSiteId, setParentSiteId] = useState('');
    const [posts, setPosts] = useState([]);
    const [postsHasUpdated, setPostsHasUpdated] = useState(false);
    const [postToUpdate, setPostToUpdate] = useState(null);

    useEffect(() => {
        if(postsHasUpdated == true){
            fetchAllBlogEntries(parentSiteId).then(res => {
                setPosts(res.items);
                setPostsHasUpdated(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [postsHasUpdated]);

    return (
        <>
            <h1>Blog App!</h1>
            
            <div>
                {postToUpdate != null ?
                    (
                        <>
                        <ClayButton displayType="primary" onClick={() => setPostToUpdate(null)}>{"Cancel"}</ClayButton>
                            <UpdateBlogPostingForm
                                data={postToUpdate}
                                setPostsHasUpdated={setPostsHasUpdated}
                            />
                        </>
                    ) :
                    (
                        <CreateBlogPostingForm
                            setPostsHasUpdated={setPostsHasUpdated}
                            setParentSiteId={setParentSiteId}
                        />
                    )
                }
            </div>

            <div className="row">
                <BlogPostingList
                    posts={posts}
                    setPostToUpdate={setPostToUpdate}
                    setPostsHasUpdated={setPostsHasUpdated}
                />
            </div>
        </>
    )

}export default App;