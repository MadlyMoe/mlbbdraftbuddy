# HeroSearch.py
from difflib import get_close_matches

"""
Search for heroes by name using fuzzy matching.
Args:
    name (str): The name (or partial name) of the hero to search for.
    heroes (list of dict): A list of hero dictionaries, each containing at least a 'name' key.
    n (int, optional): The maximum number of close matches to return. Defaults to 3.
    cutoff (float, optional): The similarity threshold between 0 and 1 for considering a match. Defaults to 0.6.
Returns:
    list of dict: A list of hero dictionaries whose names closely match the input name.
"""

def hero_search(pick_list):
    while True:
        search_name = input("Enter hero name to search: ").strip()
        if search_name == "":
            return None
        found_hero = search_hero_by_name(search_name, pick_list)
        if found_hero:
            print(f"Found hero: {found_hero}")
            if len(found_hero) > 1:
                print("Multiple heroes found:")
                for idx, hero in enumerate(found_hero, 1):
                    print(f"{idx}. {hero['name']}")
                while True:
                    try:
                        choice = int(input("Select the hero by number: "))
                        if 1 <= choice <= len(found_hero):
                            selected_hero = found_hero[choice - 1]
                            print(f"You selected: {selected_hero['name']}")
                            break
                        else:
                            print("Invalid number. Try again.")
                    except ValueError:
                        print("Please enter a valid number.")
            else:
                selected_hero = found_hero[0]
                print(f"You selected: {selected_hero['name']}")
            break
        else:
            print("Hero not found. Please try again.")
    return selected_hero

def search_hero_by_name(name, heroes, n=3, cutoff=0.6):
    hero_names = [hero['name'] for hero in heroes] # Extract names from hero dictionaries
    matches = get_close_matches(name, hero_names, n=n, cutoff=cutoff) # Find close matches
    # Return hero dictionaries whose names are in the list of close matches
    return [hero for hero in heroes if hero['name'] in matches]  