// Usage Template

// fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer", // no-referrer, *client
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
// })
//     .then(response => response.json()); // parses response to JSON

const request = async (url, options) => {
    let res = await fetch(url, options);
    return await res.json();
};

export default request;
