import React, { useCallback, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';
import { updateBlogEntry } from '../../services/BlogService';

function UpdateBlogPostingForm({setPostsHasUpdated, data}){

    const [articleBody, setArticleBody] = useState(data.articleBody);
    const [headline, setHeadline] = useState(data.headline);

    const onButtonSubmit = useCallback(() => {
        updateBlogEntry(data.postId,
            {
                articleBody: articleBody,
                headline: headline
            }
        ).then((resp) => {
                setArticleBody(''),
                setHeadline(''),
                setPostsHasUpdated(true)
        })
    },
        [
            updateBlogEntry,
            data,
            articleBody,
            headline
        ]);

    return (
        <>
            <div>
                <h3>Update an existing post</h3>

                <div className='row'>
                    <div className='col-2'>
                        <label htmlFor='postId'>Post ID {data.postId}</label>
                    </div>

                    <div className='col'>
                        <ClayForm.Group>
                            <label htmlFor='headline'>Headline</label>
                            <ClayInput
                                id="headline"
                                onChange={event => setHeadline(event.target.value)}
                                placeholder="Text about headline"
                                type="text"
                                value={headline}
                            >
                            </ClayInput>
                        </ClayForm.Group>
                    </div>
                </div>

                <div className='row'>

                    <div className='col'>

                        <ClayForm.Group>
                            <label htmlFor='articleBody'>Article Body</label>
                            <ClayInput
                                id="articleBody"
                                component="textarea"
                                onChange={event => setArticleBody(event.target.value)}
                                placeholder="Text about article body"
                                type="text"
                                value={articleBody}
                            >
                            </ClayInput>
                        </ClayForm.Group>
                    </div>
                </div>

                <ClayButton displayType="primary" onClick={() => onButtonSubmit()}>{"Update post"}</ClayButton>
            </div>
        </>
    )

}export default UpdateBlogPostingForm;