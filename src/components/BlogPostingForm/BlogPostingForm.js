import React, { useCallback, useEffect, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import { postBlogEntry, updateBlogEntry } from '../../services/BlogService';
import ClayButton from '@clayui/button';


function BlogPostingForm({ onSavePost, onUpdatePost, postToUpdate }) {
    const [isEditionMode, setIsEditionMode] = useState(false);
    const [articleBody, setArticleBody] = useState('');
    const [headline, setHeadline] = useState('');

    useEffect(() => {
        if(postToUpdate != null){
            setArticleBody(postToUpdate.articleBody);
            setHeadline(postToUpdate.headline);
            setIsEditionMode(true);
        }
    }, [postToUpdate])

    
    const onSaveButtonSubmit = useCallback(() => {
        postBlogEntry({
                articleBody: articleBody,
                headline: headline
            }
        ).then((resp) => {
            setArticleBody(''),
                setHeadline(''),
                onSavePost(resp)
        }).catch((error) => { console.log(error) });
    },
        [
            postBlogEntry,
            articleBody,
            headline
        ]);


    const onUpdateButtonSubmit = useCallback(() => {
        updateBlogEntry(postToUpdate.postId,
            {
                articleBody: articleBody,
                headline: headline
            }
        ).then((resp) => {
            setArticleBody(''),
                setHeadline(''),
            setIsEditionMode(false)
            onUpdatePost(postToUpdate.postId)
        }).catch((error) => { console.log(error) });
    },
        [
            updateBlogEntry,
            postToUpdate,
            articleBody,
            headline
        ]);

    const exitEditionMode = () => {
        setArticleBody('');
        setHeadline('');
        setIsEditionMode(false)
    }

    return (
        <>
            <div>
                <h3>{isEditionMode ? ("Edit") : ("Add a new")} blog posting</h3>

                <div className='row'>
                    <div className='col-2'>
                        <ClayForm.Group>
                            {isEditionMode ? (<>
                                <label htmlFor='postId'>Post ID {postToUpdate.postId}</label>
                            </>) :
                                (
                                <>
                                    {/* <label htmlFor='siteId'>Site ID</label>

                                    <ClayInput
                                        id="siteId"
                                        onChange={event => setSiteId(event.target.value)}
                                        placeholder="1234"
                                        type="text"
                                        value={siteId}
                                    >
                                    </ClayInput> */}
                                </>
                                )
                            }
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

                <div className='row'>
                    {isEditionMode ?
                        (<>
                            <div className='col'>
                                <ClayButton displayType="primary" onClick={() => onUpdateButtonSubmit()}>{"Update post"}</ClayButton>
                            </div>

                            <div className='col'>
                                <ClayButton displayType="primary" onClick={() => exitEditionMode()}>{"Cancel"}</ClayButton>
                            </div>
                        </>
                        ) :
                        (<>
                            <div className='col'>
                                <ClayButton displayType="primary" onClick={() => onSaveButtonSubmit()}>{"Add post"}</ClayButton>
                            </div>

                        </>)
                    }
                </div>
            </div>
        </>
    )
} export default BlogPostingForm;