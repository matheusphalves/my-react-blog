export function fetchAllBlogEntries(siteId) {
    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`,
        { method: 'GET', headers: getHeaders('test@liferay.com', 'test') }
    ).then(resp => resp.json());
}

export function postBlogEntry(siteId, payloadContent){

    let headers = getHeaders('test@liferay.com', 'test')
    const request = createPostRequest(payloadContent, headers)
    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`,
        request
    ).then(res => res.json());
}


export function getSingleBlogEntryById(blogPostingId) {

    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}`,
        { method: 'GET', headers: getHeaders('test@liferay.com', 'test') }
    ).then(resp => resp.json());
}



export function deleteSingleBlogEntryById(blogPostingId) {

    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}`,
        { method: 'DELETE', headers: getHeaders('test@liferay.com', 'test') }
    ).then(resp => resp.json());
}

export function getHeaders(user, password){
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

function createPostRequest(data, headers){

    const request = {
		body: JSON.stringify(data),
		headers,
		method: 'POST'
	};

    return request;
}