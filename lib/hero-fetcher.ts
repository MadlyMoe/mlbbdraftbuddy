import axios from 'axios';

export async function numberOfHeros() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-list/'
    };

    const response = await axios.request(config);
    
    return Object.keys(response.data).length;
}

export async function heroPosition(heros: number) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-position/',
        params: { size: heros }
    };

    const response = await axios.request(config);
    // get id name roles lanes smallmap

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


export async function getAllHeros() {

    let heros = await numberOfHeros();
    // Rank for Icon
    const rank = await heroRank(heros);
    // Position for Name, ID, Roles, Lanes, Banner
    const pos = await heroPosition(heros);

    const list = pos.map(hero => {
        const rankHero = rank.find( item => item.name === hero.heroName);

        return {
            ...hero,
            icon: rankHero? rankHero.icon:""
        };
    });

    return list;
}
