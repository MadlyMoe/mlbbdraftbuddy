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
        let hero_id = hero.data.hero_id;
        let name = hero.data.hero.data.name;
        const lanes = (hero.data.hero.data.roadsort || [])
            .filter(item => item && item.data && item.data.road_sort_title)
            .map(item => item.data.road_sort_title);
        const roles = (hero.data.hero.data.sortid || [])
            .filter(item => item && item.data && item.data.sort_title)
            .map(item => item.data.sort_title);
        let banner = hero.data.hero.data.smallmap;


        return {hero_id, name, lanes, roles, banner}
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


export async function getList() {

    let heros = await numberOfHeros();
    // Rank for Icon
    const rank = await heroRank(heros);
    // Position for Name, ID, Roles, Lanes, Banner
    const pos = await heroPosition(heros);

    const list = pos.map(hero => {
        const rankHero = rank.find( item => item.name === hero.name);

        return {
            ...hero,
            icon: rankHero.icon ?? ""
        };
    });

    return list;
}
