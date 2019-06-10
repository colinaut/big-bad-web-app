const isProdrodution = true; //set to true to use bigbadcon.com

const getAPIurl = (type) => {
    const baseurl = isProdrodution? "https://www.bigbadcon.com" : "http://www.logictwine.com"
    let url = "";

    switch(type){
        case "posts":
            url = "/wp-json/wp/v2/posts";
            break;
        case "events":
            url = ":8091/api/events/all";
            break;
        case "login":
            url = ":8091/api/login";
            break;
        default:
            url = "";
    }

    return baseurl + url
}

export default getAPIurl