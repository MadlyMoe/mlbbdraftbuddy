# Init.py

from FetchApi import fetch_api

def get_heroes_list():
    hero_list_link = "https://mlbb-stats.ridwaanhall.com/api/hero-list/"
    hero_list = fetch_api(hero_list_link)
    hero_rates_link = "https://mlbb-stats.ridwaanhall.com/api/hero-rank/?days=7&rank=mythic&size=128&index=1&sort_field=pick_rate&sort_order=asc"
    hero_rates = fetch_api(hero_rates_link)

    heroes = []
    for record in hero_rates["data"]["records"]:
        data = record["data"]
        hero_id = data.get("main_heroid")
        hero_name = data.get("main_hero", {}).get("data", {}).get("name") or hero_list.get(str(hero_id))
        win_rate = data.get("main_hero_win_rate")
        pick_rate = data.get("main_hero_appearance_rate")
        ban_rate = data.get("main_hero_ban_rate")
        heroes.append({
            "id": hero_id,
            "name": hero_name,
            "win_rate": win_rate,
            "pick_rate": pick_rate,
            "ban_rate": ban_rate
        })

    heroes.sort(key=lambda x: x["id"])
    
    return heroes