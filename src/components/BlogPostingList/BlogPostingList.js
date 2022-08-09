import React from 'react';
import ClayTable from '@clayui/table';

function BlogPostingList({posts}){
    return (
        <>
            <h1>Blog Posting List</h1>

            <ClayTable>
                <ClayTable.Head>
                    <ClayTable.Row>
                        <ClayTable.Cell headingCell>{"Site ID"}</ClayTable.Cell>
                        <ClayTable.Cell headingCell>{"Post ID"}</ClayTable.Cell>
                        <ClayTable.Cell headingCell>{"Headline"}</ClayTable.Cell>
                        <ClayTable.Cell headingCell>{"Article Body"}</ClayTable.Cell>
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
                            </ClayTable.Row>
                            )
                        })
                    }
                </ClayTable.Body>
            </ClayTable>
        </>
    );
}export default BlogPostingList;