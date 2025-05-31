import axios from 'axios';

// We could probably cache this for like an hour to give their api a break
export async function heroPosition() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-position/'
    };

    const response = await axios.request(config);
    // get id name roles lanes smallmap


    // data > records is where it splits between heros
    console.log("I'm cooked");

    const list = response.data.data.records.map(hero => {
        let hero_id = hero.data.hero_id;
        let name = hero.data.hero.data.name;
                // Make sure roadsort is an array and filter invalid items
        const lanes = (hero.data.hero.data.roadsort || [])
            .filter(item => item && item.data && item.data.road_sort_title)
            .map(item => item.data.road_sort_title);

        // Same for sortid (roles)
        const roles = (hero.data.hero.data.sortid || [])
            .filter(item => item && item.data && item.data.sort_title)
            .map(item => item.data.sort_title);

        let banner = hero.data.hero.data.smallmap;


        return {hero_id, name, lanes, roles, banner}
    });

    return list;
}

export async function heroRank() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-rank/'
    };

    const response = await axios.request(config);
    // get only names and icons


    // data > records[] > data > main_hero > data > name
    // data > records[] > data > main_hero > data > head

    return response.data;
}


export async function getList() {

    // Game plan
    // call hero rank for icon
    const rank = await heroPosition();

    // call hero position for id, name, roles, lanes, banner
    //const pos = await heroPosition();

    // Get hero list


    return rank;
}
