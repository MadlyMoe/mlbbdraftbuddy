# ConsoleDraftBuddy.py

from Init import get_heroes_list
from HeroSearch import hero_search

hero_list = get_heroes_list()

class DraftBuddyConsole:
    def __init__(self):
        self.team_names = ["Team 1", "Team 2"]
        self.bans = [[None]*5 for _ in range(2)]
        self.picks = [[None]*5 for _ in range(2)]
        self.heroes = hero_list.copy()
        self.score = [0, 0]  # Initialize scores for both teams
        self.run()

    def display(self):
        print("\n=== Draft Buddy ===")
        for team in range(2):
            print(f"{self.team_names[team]}")
            print("  Bans: ", end="")
            print(", ".join([b.get('name') if b else "Empty" for b in self.bans[team]]))
            print("  Picks:", end=" ")
            print(", ".join([p.get('name') if p else "Empty" for p in self.picks[team]]))

    def ban_phase(self):
        print("\n=== Banning Phase ===")
        # First phase: each team bans 3 times, alternating (total 3 bans per team)
        for team in range(2):
            for ban_round in range(3):
                print(f"\n{self.team_names[team]} - Ban {ban_round+1}:")
                hero = hero_search(hero_list)
                self.bans[team][ban_round] = hero
                # Remove banned hero from available heroes
                if hero in self.heroes:
                    self.heroes.remove(hero)

        # Second phase: each team bans 2 times, alternating (total 2 bans per team)
        for team in range(2):
            for ban_round in range(3, 5):
                print(f"\n{self.team_names[team]} - Ban {ban_round+1}:")
                hero = hero_search(hero_list)
                self.bans[team][ban_round] = hero
                # Remove banned hero from available heroes
                if hero in self.heroes:
                    self.heroes.remove(hero)

    def pick_phase(self):
        print("\n=== Picking Phase ===")
        first_team = None
        while first_team not in ["1", "2"]:
            first_team = input("Which team picks first? (1 or 2): ")
        first_team = int(first_team) - 1
        second_team = 1 - first_team

        pick_order = [
            (first_team, 1),
            (second_team, 2),
            (first_team, 2),
            (second_team, 2),
            (first_team, 2),
            (second_team, 1)
        ]

        pick_slots = [0, 0]  # Track next available pick slot for each team

        for team, num_picks in pick_order:
            for _ in range(num_picks):
                self.display()
                hero = hero_search(self.heroes)
                hero = hero if hero else None
                if pick_slots[team] < 5:
                    self.picks[team][pick_slots[team]] = hero
                    pick_slots[team] += 1
                if hero in self.heroes:
                    self.heroes.remove(hero)

    def run(self):
        self.ban_phase()
        self.display()
        self.pick_phase()
        self.display()
        print("\nDraft complete.")

if __name__ == "__main__":
    DraftBuddyConsole()