import React, { useCallback, useState, useEffect } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import { postBlogEntry } from '../../services/BlogService'


function BlogPostingForm({setHasNewPost, setParentSiteId}) {
    const [articleBody, setArticleBody] = useState('');
    const [headline, setHeadline] = useState('');
    const [siteId, setSiteId] = useState('');

    console.log(setHasNewPost)
    console.log(setParentSiteId)

    const onButtonSubmit = useCallback(() => {
        postBlogEntry(siteId,
            {
                articleBody: articleBody,
                headline: headline
            }
        ).then((resp) => {
            console.log(resp),
                setArticleBody(''),
                setHeadline(''),
                setSiteId(''),
                setParentSiteId(siteId),
                setHasNewPost(true)
        })
    },
        [
            postBlogEntry,
            siteId,
            articleBody,
            headline
        ]);


    return (
        <>
            <div>
                <h3>Add new blog posting</h3>

                <div className='row'>
                    <div className='col-2'>
                        <ClayForm.Group>
                            <label htmlFor='siteId'>Site ID</label>
                            <ClayInput
                                id="siteId"
                                onChange={event => setSiteId(event.target.value)}
                                placeholder="1234"
                                type="text"
                                value={siteId}
                            >
                            </ClayInput>
                        </ClayForm.Group>
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

                <button className="btn btn-primary" onClick={() => onButtonSubmit()}>Add post</button>
            </div>
        </>
    )
} export default BlogPostingForm;