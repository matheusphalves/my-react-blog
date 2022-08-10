import React from 'react';
import ClayTable from '@clayui/table';
import ClayToolbar from '@clayui/toolbar';
import ClayButton from '@clayui/button';
import {deleteSingleBlogEntryById} from '../../services/BlogService';

function BlogPostingList({posts, setPostsHasUpdated, setPostToUpdate}){

    const handleDeletePost = (event) => {
        console.log('Delete post:', event.target.value);
        deleteSingleBlogEntryById(event.target.value)
        .then((resp) => {
            setPostsHasUpdated(true);
        })
        .catch((error) => {console.log(error)});
    }

    const handleUpdatePost = (post) => {
        console.log('Update post:', post);
        const dataToUpdate = {
            postId: post.id,
            headline: post.headline,
            articleBody: post.articleBody
        }
        setPostToUpdate(dataToUpdate);
    }

    return (
        <>
            <h1>Blog Posting List</h1>

            {posts.length === 0 ?
                (
                    <>
                        <br></br>
                        <p>Nothing to show...</p>
                    </>
                ) :
                (
                    <ClayTable>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                <ClayTable.Cell headingCell>{"Site ID"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Post ID"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Headline"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Article Body"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Actions"}</ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>

                        <ClayTable.Body>
                            {
                                posts.map((post) => {
                                    return (
                                        <ClayTable.Row key={post.id}>
                                            <ClayTable.Cell headingTitle>{post.siteId}</ClayTable.Cell>
                                            <ClayTable.Cell>{post.id}</ClayTable.Cell>
                                            <ClayTable.Cell>{post.headline}</ClayTable.Cell>
                                            <ClayTable.Cell>{post.articleBody}</ClayTable.Cell>
                                            <ClayTable.Cell>
                                                <ClayToolbar.Section>
                                                    <div className='row'>
                                                        <div className='col-5'>
                                                            <ClayToolbar.Item>
                                                                <ClayButton displayType="secondary" onClick={(event) => handleUpdatePost(post)}>{"Update"}</ClayButton>
                                                            </ClayToolbar.Item>
                                                        </div>

                                                        <div className='col-5'>
                                                            <ClayToolbar.Item>
                                                                <ClayButton displayType="primary" value={post.id} onClick={handleDeletePost}>{"Delete"}</ClayButton>
                                                            </ClayToolbar.Item>
                                                        </div>
                                                    </div>
                                                </ClayToolbar.Section>
                                            </ClayTable.Cell>

                                        </ClayTable.Row>
                                    )
                                })
                            }
                        </ClayTable.Body>
                    </ClayTable>
                )
            }
        </>
    );
}export default BlogPostingList;