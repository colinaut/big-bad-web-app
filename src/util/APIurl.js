const isProdution = false; //set to true to use bigbadcon.com

export const POSTS = 'POSTS';
export const EVENTS_ALL = 'EVENTS_ALL';
export const EVENTS_ALL_PUBLIC = 'EVENTS_ALL_PUBLIC';
export const EVENTS_CATEGORY = 'EVENTS_CATEGORY';
export const EVENTS_ME = 'EVENTS_ME';
export const EVENTS_PAGED = 'EVENTS_PAGED';
export const EVENTS_PAGED_PUBLIC = 'EVENTS_PAGED_PUBLIC';
export const EVENTS_SINCE = 'EVENTS_SINCE';
export const EVENTS_SINCE_PUBLIC = 'EVENTS_SINCE_PUBLIC'
export const LOGIN = 'LOGIN'

export const getUrl = (type,options) => {
    const eventAPIurl = isProdution? "https://www.bigbadcon.com:8091/api/" : "https://www.logictwine.com:8091/api/"
    
    switch(type){
        case POSTS:
            return 'https://www.bigbadcon.com/wp-json/wp/v2/posts'; //only set up to connect to BBC for blog posts at the moment
        case EVENTS_ALL:
            return eventAPIurl + 'events/all';
        case EVENTS_ALL_PUBLIC:
            return eventAPIurl + 'events/all/public';
        case EVENTS_CATEGORY:
            return eventAPIurl + 'events/category/' + options.id;
        case EVENTS_ME:
            return eventAPIurl + 'events/me';
        case EVENTS_PAGED:
            return eventAPIurl + 'events/page/' + options.length + '/' + options.offset;
        case EVENTS_PAGED_PUBLIC:
            return eventAPIurl + 'events/page/public' + options.length + '/' + options.offset;
        case EVENTS_SINCE:
            return eventAPIurl + 'events/since/' + options.epochtime;
        case EVENTS_SINCE_PUBLIC:
            return eventAPIurl + 'events/since/' + options.epochtime + '/public';
        case LOGIN:
            return eventAPIurl + 'login';
        default:
            return false;
    }
}