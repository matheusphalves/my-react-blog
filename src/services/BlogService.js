const siteKey = Liferay.ThemeDisplay.getSiteGroupId();

export function fetchAllBlogEntries() {
    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/sites/${siteKey}/blog-postings`,
        { method: 'GET', headers: getHeaders('test@liferay.com', 'test') }
    ).then(resp => resp.json());
}

export function postBlogEntry(payloadContent){

    let headers = getHeaders('test@liferay.com', 'test')
    const request = createPostRequest(payloadContent, headers, 'POST')
    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/sites/${siteKey}/blog-postings`,
        request
    ).then(res => res.json());
}

export function updateBlogEntry(blogPostId, payloadContent){

    let headers = getHeaders('test@liferay.com', 'test')
    const request = createPostRequest(payloadContent, headers, 'PUT')
    return Liferay.Util.fetch(
        `/o/headless-delivery/v1.0/blog-postings/${blogPostId}`,
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
    ).then(() => {});
}

export function getHeaders(user, password){
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(`${user}:${password}`));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

function createPostRequest(data, headers, method){

    const request = {
		body: JSON.stringify(data),
		headers,
		method: method
	};

    return request;
}