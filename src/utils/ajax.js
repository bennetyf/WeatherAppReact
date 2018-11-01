const request = async (url, options) => {
    let res = await fetch(url, options);
    return await res.json();
};

export default request;
