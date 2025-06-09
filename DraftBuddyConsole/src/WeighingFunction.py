# WeighingFunction.py

# defined constants for weights
b_rate_weight = 1.0
p_rate_weight = 0.5
w_rate_weight = 0.75


def calculate_score(heroes, current_team):
    """
    Calculate a weighted score for a hero based on its rates and given weights.
    
    Args:
        hero (dict): A dictionary containing hero information including 'id'.
        
    Returns:
        float: The calculated weighted score for the hero.
    """
    # Compute scores for each hero
    scored_heroes = []
    for hero in heroes:
        win_rate = hero.get('win_rate', 0)
        pick_rate = hero.get('pick_rate', 0)
        ban_rate = hero.get('ban_rate', 0)
        score = (ban_rate * b_rate_weight) + (pick_rate * p_rate_weight) + (win_rate * w_rate_weight)
        scored_heroes.append({'hero': hero.get('name', 0), 'score': score})

    # Sort heroes by score descending
    scored_heroes.sort(key=lambda x: x['score'], reverse=True)

    return scored_heroes