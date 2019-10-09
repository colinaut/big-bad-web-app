const isDev = process.env.IS_DEVELOPMENT_API || false; //set in .env
const baseAPIurl = isDev? "https://www.logictwine.com:8091/api/" : "https://www.bigbadcon.com:8091/api/";
//const baseAPIurl = '/api/'

// API Docs are here: https://bigbadcon.com:8091/api/swagger-ui.html https://www.logictwine.com:8091/api/swagger-ui.html

// WP native
export const POSTS = 'POSTS';
export const PAGES = 'PAGES';
export const MENUS = 'MENUS';

// Jerry's API
export const EVENTS_COUNT = 'EVENTS_COUNT';
export const EVENTS_ALL = 'EVENTS_ALL';
export const EVENTS_ALL_PUBLIC = 'EVENTS_ALL_PUBLIC';
export const EVENTS_CATEGORY = 'EVENTS_CATEGORY';
export const EVENTS_ME = 'EVENTS_ME';
export const EVENTS_PAGED = 'EVENTS_PAGED';
export const EVENTS_PAGED_PUBLIC = 'EVENTS_PAGED_PUBLIC';
export const EVENTS_SINCE = 'EVENTS_SINCE';
export const EVENTS_SINCE_PUBLIC = 'EVENTS_SINCE_PUBLIC';
export const EVENTS_FIND_EVENT = 'EVENTS_FIND_EVENT';
export const EVENTS_ME_FAV = 'EVENTS_ME_FAV';
export const EVENTS_ME_FAV_CREATE = 'EVENTS_ME_FAV_CREATE';
export const EVENTS_ME_FAV_DELETE = 'EVENTS_ME_FAV_DELETE';
export const USERS_ME = 'USERS_ME';
export const USERS_SET_MY_PASSWORD = 'USERS_SET_MY_PASSWORD';
export const BOOKINGS_BOOK_ME_INTO_GAME = 'BOOKINGS_BOOK_ME_INTO_GAME';
export const BOOKINGS_REMOVE_ME_FROM_GAME = 'BOOKINGS_REMOVE_ME_FROM_GAME';
export const BOOKINGS_MY_AVAILABLE_GAME_SLOTS = 'BOOKINGS_MY_AVAILABLE_GAME_SLOTS';
export const LOGIN = 'LOGIN'
export const IS_ADMIN = 'IS_ADMIN'
export const COUNTDOWN = 'COUNTDOWN'

export const getUrl = (type,options) => {
    
    switch(type){
        case POSTS:
            return 'https://www.bigbadcon.com/wp-json/wp/v2/posts'; //only set up to connect to BBC for blog posts at the moment
        case PAGES:
            return 'https://www.bigbadcon.com/wp-json/wp/v2/pages'; //only set up to connect to BBC for blog posts at the moment
        case MENUS:
            return 'https://www.bigbadcon.com/wp-json/menus/v1/menus';
        case EVENTS_COUNT:
            return baseAPIurl + 'events/count';
        case EVENTS_ALL:
            return baseAPIurl + 'events/all';
        case EVENTS_ALL_PUBLIC:
            return baseAPIurl + 'events/all/public';
        case EVENTS_CATEGORY:
            return baseAPIurl + 'events/category/' + options.id;
        case EVENTS_ME:
            return baseAPIurl + 'events/me';
        case EVENTS_PAGED:
            return baseAPIurl + 'events/page/' + options.length + '/' + options.offset;
        case EVENTS_PAGED_PUBLIC:
            return baseAPIurl + 'events/page/public' + options.length + '/' + options.offset;
        case EVENTS_SINCE:
            return baseAPIurl + 'events/since/' + options.epochtime;
        case EVENTS_SINCE_PUBLIC:
            return baseAPIurl + 'events/since/' + options.epochtime + '/public';
        case EVENTS_FIND_EVENT:
            return baseAPIurl + 'events/find/';
        case EVENTS_ME_FAV:
            return baseAPIurl + '/events/me/favorites';
        case EVENTS_ME_FAV_CREATE:
            return baseAPIurl + 'events/me/favorite/create';
        case EVENTS_ME_FAV_DELETE:
            return baseAPIurl + 'events/me/favorite/delete';
        case USERS_ME:
            return baseAPIurl + 'users/me';
        case USERS_SET_MY_PASSWORD:
            return baseAPIurl + 'users/setMyPassword';
        case BOOKINGS_BOOK_ME_INTO_GAME:
            return baseAPIurl + 'bookings/bookMeIntoGame';
        case BOOKINGS_REMOVE_ME_FROM_GAME:
            return baseAPIurl + 'bookings/removeMeFromGame';
        case BOOKINGS_MY_AVAILABLE_GAME_SLOTS:
            return baseAPIurl + 'bookings/myAvailableSlots';
        case LOGIN:
            return baseAPIurl + 'login';
        case IS_ADMIN:
            return baseAPIurl + 'users/me/isadmin';
        case COUNTDOWN:
            return "https://api.github.com/gists/90b6782b0e52ca48127763c15d544724"
        default:
            return false;
    }
}