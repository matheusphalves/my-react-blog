import React from 'react';
import ClayTable from '@clayui/table';
import ClayToolbar from '@clayui/toolbar';
import ClayButton from '@clayui/button';
import {deleteSingleBlogEntryById} from '../../services/BlogService';

function BlogPostingList({posts, setPostToUpdate, onDeletePost}){

    const handleDeletePost = (event) => {
        let postId = event.target.value
        deleteSingleBlogEntryById(postId)
        .then((resp) => {
            onDeletePost(postId);
        })
        .catch((error) => {console.log(error)});
    }

    const handleUpdatePost = (post) => {
        const dataToUpdate = {
            postId: post.id,
            headline: post.headline,
            articleBody: post.articleBody
        }
        setPostToUpdate(dataToUpdate);
    }

    return (
        <>
            <div className='row'>
                <h1>List of posts</h1>
            </div>

            {posts.length === 0 ?
                (
                    <>
                        <div className='row'>
                            <p>Nothing to show...</p>
                        </div>
                    </>
                ) :
                (
                    <ClayTable>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                {/* <ClayTable.Cell headingCell>{"Site ID"}</ClayTable.Cell> */}
                                <ClayTable.Cell headingCell>{"Post ID"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Headline"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Article Body"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Modified at"}</ClayTable.Cell>
                                <ClayTable.Cell headingCell>{"Actions"}</ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>

                        <ClayTable.Body>
                            {
                                posts.map((post) => {
                                    return (
                                        <ClayTable.Row key={post.id}>
                                            {/* <ClayTable.Cell headingTitle>{post.siteId}</ClayTable.Cell> */}
                                            <ClayTable.Cell>{post.id}</ClayTable.Cell>
                                            <ClayTable.Cell>{post.headline}</ClayTable.Cell>
                                            <ClayTable.Cell>{post.articleBody}</ClayTable.Cell>
                                            <ClayTable.Cell>{post.dateModified}</ClayTable.Cell>
                                            <ClayTable.Cell>
                                                <ClayToolbar.Section>
                                                    <div className='row'>
                                                        <div className='col-5'>
                                                            <ClayToolbar.Item>
                                                                <ClayButton displayType="secondary" onClick={() => handleUpdatePost(post)}>{"Edit"}</ClayButton>
                                                            </ClayToolbar.Item>
                                                        </div>

                                                        <div className='col-5'>
                                                            <ClayToolbar.Item>
                                                                <ClayButton displayType="primary" value={post.id} onClick={handleDeletePost}>{"X"}</ClayButton>
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