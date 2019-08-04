const isProdution = false; //set to true to use bigbadcon.com

const getAPIurl = (type,options) => {
    const eventAPIurl = isProdution? "https://www.bigbadcon.com:8091/api/" : "https://www.logictwine.com:8091/api/"
    
    switch(type){
        case "posts":
            return 'https://www.bigbadcon.com/wp-json/wp/v2/posts'; //only set up to connect to BBC for blog posts at the moment
        case "events all":
            return eventAPIurl + 'events/all';
        case "events all public":
            return eventAPIurl + 'events/all/public';
        case "events category":
            return eventAPIurl + 'events/category/' + options.id;
        case "events me":
            return eventAPIurl + 'events/me';
        case "events paged":
            return eventAPIurl + 'events/page/' + options.length + '/' + options.offset;
        case "events paged public":
            return eventAPIurl + 'events/page/public' + options.length + '/' + options.offset;
        case "events all updated":
            return eventAPIurl + 'events/since/' + options.epochtime;
        case "events all updated public":
            return eventAPIurl + 'events/since/' + options.epochtime + '/public';
        case "login":
            return eventAPIurl + 'login';
        default:
            return false;
    }
}

export default getAPIurl