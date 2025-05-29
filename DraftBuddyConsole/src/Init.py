# Init.py

from FetchApi import fetch_api

def get_heroes_list():
    hero_list_link = "https://mlbb-stats.ridwaanhall.com/api/hero-list/" # URL to fetch the hero list
    hero_list = fetch_api(hero_list_link)

    num_heroes = len(hero_list)

    heroes = []
    for i in range(1, num_heroes+1):
        hero_name = hero_list.get(str(i))
        hero_id = i
        heroes.append({'name': hero_name, 'id': hero_id})
    return heroes