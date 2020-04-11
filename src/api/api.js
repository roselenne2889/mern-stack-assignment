const endPoint = "http://localhost:3000/api";

export async function getFromDatabase(url) {
    let content;
    try {
        const rawResponse = await fetch(`${endPoint}/${url}`);
        content = await rawResponse.json();
    } catch (error) {}
    return await content;
}

export async function getFromDatabasePost(url, postForm) {
    let content;
    try {
        const rawResponse = await fetch(`${endPoint}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postForm)
        });
        content = await rawResponse.json();
    } catch (error) {}
    return await content;
}
