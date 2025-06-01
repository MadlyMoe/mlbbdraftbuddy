import axios from 'axios';

// Weighing Functions


// We could probably cache this for like an hour to give their api a break
export async function heroList() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mlbb-stats.ridwaanhall.com/api/hero-list/'
    };

    const response = await axios.request(config);
    return response.data;
}


export async function getSuggestions(allyPicks: string[], enemyPicks: string[]) {

    // Get hero list
    const list = await heroList();

    // Weigh it based on picks

    // This is just dummy data/dummy structure
    const suggestions = [
        {
            "heroId": "1",
            "heroName": "Miya",
            "winRate": "1",
            "confidence": "0.99",
        },
        {
            "heroId": "2",
            "heroName": "Layla",
            "winRate": "0.67",
            "confidence": "0.99",
        },
    ];

    return list;
}
