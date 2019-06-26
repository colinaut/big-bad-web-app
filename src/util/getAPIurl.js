const isProdution = true; //set to true to use bigbadcon.com

const getAPIurl = (type) => {
    const eventAPIurl = isProdution? "https://www.bigbadcon.com:8091/api/" : "http://www.logictwine.com:8092/"

    switch(type){
        case "posts":
            return 'https://www.bigbadcon.com/wp-json/wp/v2/posts'; //only set up to connect to BBC for blog posts at the moment
        case "events":
            return eventAPIurl + '/events/all';
        case "login":
            return eventAPIurl + '/login';
        default:
            return false;
    }
}

export default getAPIurl