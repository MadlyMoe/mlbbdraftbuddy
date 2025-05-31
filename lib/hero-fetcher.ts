import axios from 'axios';

const heroCache = new Map<string, any>();

export async function numberOfHeros() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-list/'
    };

    const response = await axios.request(config);
    
    return Object.keys(response.data).length;
}

export async function heroPosition(heros: number | null, lane: string | null) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-position/',
        params: { 
            size: heros,
            lane: lane,
        }
    };

    const response = await axios.request(config);

    // This deals with the mess of the JSON that we get from the API
    const list = response.data.data.records.map(hero => {
        let heroId = hero.data.hero_id;
        let heroName = hero.data.hero.data.name;
        const lanes = (hero.data.hero.data.roadsort || [])
            .filter(item => item && item.data && item.data.road_sort_title)
            .map(item => item.data.road_sort_title);
        const roles = (hero.data.hero.data.sortid || [])
            .filter(item => item && item.data && item.data.sort_title)
            .map(item => item.data.sort_title);
        let banner = hero.data.hero.data.smallmap;


        return {heroId, heroName, lanes, roles, banner}
    });

    return list;
}

export async function heroRank(heros: number) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-rank/',
        params: { size: heros }
    };

    const response = await axios.request(config);
    // get only names and icons

    const list = response.data.data.records.map(hero => {
        let name = hero.data.main_hero.data.name;
        let icon = hero.data.main_hero.data.head;

        return { name, icon };
    })

    return list;
}


/*
*   Used mainly for the weighingFunction I'm not sure if Gameknight would want this.
*   I'll most likely split it into frontend / backend like the others
*   rn it's just front ig?
*   
*/

export async function getHerosByLane(lane: string){

    const cacheKey = "herosInLane" + lane;
    if (heroCache.has(cacheKey)) {
        return heroCache.get(cacheKey);
    }

    const heros = await numberOfHeros();
    const rank = await heroRank(heros);
    const pos = await heroPosition(null, lane);


    // Create new JSON, matching the hero name including the icon
    const list = pos.map(hero => {
        const rankHero = rank.find( item => item.name === hero.heroName);

        return {
            ...hero,
            icon: rankHero? rankHero.icon:""
        };
    });

    // TODO: Expire cache after 6? 3? 1? hours
    heroCache.set(cacheKey, list);

    return list;
}

/*
*   Used mainly for the drafting page. 
*   
*   Returns heroId, name, roles, lanes, icon, banner
*/
export async function getAllHeros() {

    const cacheKey = "allHeros";
    if (heroCache.has(cacheKey)) {
        return heroCache.get(cacheKey);
    }
    

    let heros = await numberOfHeros();
    // Rank for Icon
    const rank = await heroRank(heros);
    // Position for Name, ID, Roles, Lanes, Banner
    const pos = await heroPosition(heros, null);

    // Create new JSON, to include Icon in the hero array
    const list = pos.map(hero => {
        const rankHero = rank.find( item => item.name === hero.heroName);

        return {
            ...hero,
            icon: rankHero? rankHero.icon : ""
        };
    });

    // TODO: Expire cache after 6? 3? 1? hours
    heroCache.set(cacheKey, list);

    return list;
}

export async function heroPositionExtended(heros: number | null, lane: string | null) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-position/',
        params: { 
            size: heros,
            lane: lane,
        }
    };

    const response = await axios.request(config);

    // This deals with the mess of the JSON that we get from the API
    const list = response.data.data.records.map(hero => {
        const heroId = hero.data.hero_id;
        const heroName = hero.data.hero.data.name;

        const lanes = (hero.data.hero.data.roadsort || [])
            .filter(item => item && item.data && item.data.road_sort_title)
            .map(item => item.data.road_sort_title);
        const roles = (hero.data.hero.data.sortid || [])
            .filter(item => item && item.data && item.data.sort_title)
            .map(item => item.data.sort_title);


        const synergyWith = hero.data.relation.assist.target_hero_id;
        const counters = hero.data.relation.strong.target_hero_id;
        const counteredBy = hero.data.relation.strong.target_hero_id;


        return {heroId, heroName, lanes, roles, synergyWith, counters, counteredBy}
    });

    return list;
}

export async function heroRankExtended(heros: number) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-rank/',
        params: { size: heros }
    };

    const response = await axios.request(config);
    // get only names and icons

    const list = response.data.data.records.map(hero => {
        const name = hero.data.main_hero.data.name;
        const pickRate = hero.data.main_hero_appearance_rate;
        const banRate = hero.data.main_hero_ban_rate;
        const winRate = hero.data.main_hero_win_rate;


        return { name, pickRate, banRate, winRate };
    })

    return list;
}

export async function getAllHerosExtended() {

    const cacheKey = "allHerosExtended";
    if (heroCache.has(cacheKey)) {
        return heroCache.get(cacheKey);
    }
    

    let heros = await numberOfHeros();
    // Position for Name, ID, Roles, Lanes, Banner
    const pos = await heroPositionExtended(heros, null);
    const rank = await heroRankExtended(heros);


    // Create new JSON, to include Icon in the hero array
    const list = pos.map(hero => {
        const rankHero = rank.find( item => item.name === hero.heroName);

        return {
            ...hero,
            winRate: rankHero? rankHero.winRate : "",
            pickRate: rankHero? rankHero.pickRate : "",
            banRate: rankHero? rankHero.banRate : "",
        };
    });

    // TODO: Expire cache after 6? 3? 1? hours
    heroCache.set(cacheKey, list);

    return list;

}

export async function getHeroByIdExtended(id: number){
    const heros = await getAllHerosExtended();
    const hero = heros.find(h => h.heroId === id);

    return hero;
}

export async function getHeroById(id: number){
    const heros = await getAllHeros();
    const hero = heros.find(h => h.heroId === id);

    return hero;
}