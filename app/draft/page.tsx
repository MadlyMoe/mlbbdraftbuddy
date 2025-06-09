'use client';

// Import libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './DraftPage.module.css';
import React, { use, useState, useEffect } from 'react';

export default function DraftPage() {
  // Passed states
  const [draftId, setDraftId] = useState<string | null>(null);
  const [teamColor, setTeamColor] = useState<string | null>(null);
  useEffect(() => {
    const id = sessionStorage.getItem('draftId');
    const color = sessionStorage.getItem('teamColor');
    setDraftId(id);
    setTeamColor(color);
  }, [])

  // Filter Section
  const [filterMode, setFilterMode] = useState<'role' | 'lane'>('role');
  const roleTabs = ['All', 'Tank', 'Fighter', 'Assassin', 'Marksman', 'Mage', 'Support'];
  const laneTabs = ['All Lanes', 'Exp Lane', 'Gold Lane', 'Mid Lane', 'Roam', 'Jungle'];
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  }

  const handleSwapFilter = () => {
    setFilterMode(prev => {
      const newMode = prev === 'role' ? 'lane' : 'role';
      setSelectedFilter(newMode === 'role' ? 'All' : 'All Lanes');
      return newMode;
    })
  }

  const [phaseIndex, setPhaseIndex] = useState(0);
  const phases = React.useMemo(() => {
    
    // Blue Team is First Pick (Click Blue Team)
    if (teamColor === 'blue') {
      return [
        'Team is banning (1)',
        'Team is banning (2)',
        'Team is banning (3)',
        'Enemy is banning (1)',
        'Enemy is banning (2)',
        'Enemy is banning (3)',
        'Team is banning (4)',
        'Team is banning (5)',
        'Enemy is banning (4)',
        'Enemy is banning (5)',
        'Team is picking (1)',
        'Enemy is picking (1)',
        'Enemy is picking (2)',
        'Team is picking (2)',
        'Team is picking (3)',
        'Enemy is picking (3)',
        'Enemy is picking (4)',
        'Team is picking (4)',
        'Team is picking (5)',
        'Enemy is picking (5)'
      ]
    }

    // Red Team is First Pick (Click Red Team)
    else if (teamColor === 'red') {
      return [
        'Team is banning (1)',
        'Team is banning (2)',
        'Team is banning (3)',
        'Enemy is banning (1)',
        'Enemy is banning (2)',
        'Enemy is banning (3)',
        'Team is banning (4)',
        'Team is banning (5)',
        'Enemy is banning (4)',
        'Enemy is banning (5)',
        'Enemy is picking (1)',
        'Team is picking (1)',
        'Team is picking (2)',
        'Enemy is picking (2)',
        'Enemy is picking (3)',
        'Team is picking (3)',
        'Team is picking (4)',
        'Enemy is picking (4)',
        'Enemy is picking (5)',
        'Team is picking (5)'
      ];
    }

    else {
      // TODO: Fix the error message
      return ['ERROR_Detected'];
    }

  }, [teamColor]);

  // Next and Back Buttons
  const handleNext = () => {
    const currentPhase = phases[phaseIndex].toLowerCase();

    // Update the ban indexand add the BannedHeroIds
    if (isCurrentPhaseBan()) {
      if (currentPhase.includes('team') && teamBanIndex < 5 && stagedTeamHeroIcon) {
        const updated = [...teamBans];
        updated[teamBanIndex] = stagedTeamHeroIcon;
        setTeamBans(updated);

        const bannedHero = heroes.find(h => h.icon === stagedTeamHeroIcon);
        if (bannedHero && !teamBannedHeroIds.includes(bannedHero.heroId)) {
          setTeamBannedHeroIds(prev => [...prev, bannedHero.heroId]);
        }

        setStagedTeamHeroIcon(null);
        setTeamBanIndex(prev => prev + 1);
      }

      else if (currentPhase.includes('enemy') && enemyBanIndex < 5 && stagedEnemyHeroIcon) {
        const updated = [...enemyBans];
        updated[enemyBanIndex] = stagedEnemyHeroIcon;
        setEnemyBans(updated);

        const bannedHero = heroes.find(h => h.icon === stagedEnemyHeroIcon);
        if (bannedHero && !enemyBannedHeroIds.includes(bannedHero.heroId)) {
          setEnemyBannedHeroIds(prev => [...prev, bannedHero.heroId]);
        }

        setStagedEnemyHeroIcon(null);
        setEnemyBanIndex(prev => prev + 1);
      }
    }

    // Updating phase
    if (phaseIndex < phases.length - 1) {
      setPhaseIndex(phaseIndex + 1);
    }
  };  
  const handleBack = () => {
    if (phaseIndex === 0) return; 
    const newPhaseIndex = phaseIndex - 1;
    const currentPhase = phases[newPhaseIndex].toLowerCase();

    // Revert the ban index and unban the hero
    if (phases[newPhaseIndex].includes('banning')) {
      
      // Remove the preview
      setStagedTeamHeroIcon(null);
      setStagedEnemyHeroIcon(null);

      if (currentPhase.includes('team') && teamBanIndex > 0) {
        const newIndex = teamBanIndex - 1;
        const heroIcon = teamBans[newIndex];
        const bannedHero = heroes.find(h => h.icon === heroIcon);
        if (bannedHero && teamBannedHeroIds.includes(bannedHero.heroId)) {
          setTeamBannedHeroIds(prev => prev.filter(id => id !== bannedHero.heroId)); 
        }

        const updated = [...teamBans];
        updated[newIndex] = `/ban-${newIndex + 1}.png`;
        setTeamBans(updated);
        setTeamBanIndex(newIndex);
      }

      else if (currentPhase.includes('enemy') && enemyBanIndex > 0) {
        const newIndex = enemyBanIndex - 1;
        const heroIcon = enemyBans[newIndex];
        const bannedHero = heroes.find(h => h.icon === heroIcon);

        if (bannedHero && enemyBannedHeroIds.includes(bannedHero.heroId)) {
          setEnemyBannedHeroIds(prev => prev.filter(id => id !== bannedHero.heroId));
        }

        const updated = [...enemyBans];
        updated[newIndex] = `/ban-${newIndex + 6}.png`;
        setEnemyBans(updated);
        setEnemyBanIndex(newIndex);
      }
    }

    setPhaseIndex(newPhaseIndex);
  }

  // Ban Section
  const [teamBans, setTeamBans] = useState<string[]>([
    '/ban-1.png', 
    '/ban-2.png', 
    '/ban-3.png', 
    '/ban-4.png', 
    '/ban-5.png',
  ]);
  const [enemyBans, setEnemyBans] = useState<string[]>([
    '/ban-6.png', 
    '/ban-7.png', 
    '/ban-8.png', 
    '/ban-9.png', 
    '/ban-10.png',
  ]);
  const [teamBanIndex, setTeamBanIndex] = useState(0);
  const [enemyBanIndex, setEnemyBanIndex] = useState(0);
  const [stagedTeamHeroIcon, setStagedTeamHeroIcon] = useState<string | null>(null);
  const [stagedEnemyHeroIcon, setStagedEnemyHeroIcon] = useState<string | null>(null);
  const [teamBannedHeroIds, setTeamBannedHeroIds] = useState<string[]>([]);
  const [enemyBannedHeroIds, setEnemyBannedHeroIds] = useState<string[]>([]);

  function isCurrentPhaseBan(): boolean {
    return phases[phaseIndex].includes('banning');
  }

  // Hero Section
  const [heroes, setHeroes] = useState<any[]>([]);
  useEffect(() => {
    async function fetchHeroes() {
      try {
        const res = await fetch('/api/hero')
        const json = await res.json();
        setHeroes(json.heros);
      }

      catch (err) {
        console.log("Failed to fetch heros: ", err);
      }
    }

    fetchHeroes();
  }, []);

  const handleHeroClick = (hero: any) => {
    if (!isCurrentPhaseBan()) return;

    const currentPhase = phases[phaseIndex].toLowerCase();

    if (currentPhase.includes('team') && teamBanIndex < 5) {
      setStagedTeamHeroIcon(hero.icon);
    }

    else if (currentPhase.includes('enemy') && enemyBanIndex < 5) {
      setStagedEnemyHeroIcon(hero.icon);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Top Ban Pools */}
      <div className="row justify-content-between mb-3">

        {/* Team Bans Component */}
        <div className="col-5 d-flex justify-content-start">
          {teamBans.map((src, i) => {
            const isPreview = i === teamBanIndex && stagedTeamHeroIcon;
            const isLockedIn = heroes.some(h => h.icon === src && teamBannedHeroIds.includes(h.heroId));

            return (
              <img 
                key={i} 
                src={isPreview ? stagedTeamHeroIcon! : src} 
                alt={`Team Ban ${i}`} 
                className={`img-thumbnail mx-1 ${isPreview ? styles.previewBan : isLockedIn ? styles.lockedBan : ''}`}
                style={{ width: 50, height: 50 }} 
              />
            );
          })}
        </div>
        
        {/* Enemy Bans Component */}
        <div className="col-5 d-flex justify-content-end">
          {enemyBans.map((src, i) => {
            const isPreview = i === enemyBanIndex && stagedEnemyHeroIcon;
            const isLockedIn = heroes.some(h => h.icon === src && enemyBannedHeroIds.includes(h.heroId));

            return (
              <img 
                key={i} 
                src={isPreview ? stagedEnemyHeroIcon! : src} 
                alt={`Enemy Ban ${i}`} 
                className={`img-thumbnail mx-1 ${isPreview ? styles.previewBan : isLockedIn ? styles.lockedBan : ''}`}
                style={{ width: 50, height: 50 }} 
              />
            );
          })}
        </div>

      </div>

      {/* Main Layout */}
      <div className="row">
        
        {/* TODO: Delete this but for now it's testing */}
        <h3 className="text-black">
          {phases[phaseIndex]} — <span className="text-capitalize">{teamColor} team | draftid {draftId}</span>
        </h3>

        {/* Left Sidebar: Team Picks */}
        <div className="col-2 border-end text-white">
          <h5 className='text-dark'>Team</h5>
          {[...Array(5)].map((_, i) => (

            /* Team Display Component */
            <div key={i} className="mb-3 text-center">
              <div className="bg-dark p-2 rounded">
                <img src="/avatar-placeholder.png" alt={`Team ${i + 1}`} className="img-fluid rounded mb-1" />
                <p className="mb-0">Team {i + 1}</p>
              </div>
            </div>

          ))}
        </div>

        {/* Center Panel */}
        <div className="col-8 text-black">

          {/* Title Phase */}
          <div className="row mb-2">
            <div className="col text-center">
              <h3 className="text-black">{phases[phaseIndex]}</h3>
            </div>
          </div>

          <div className='d-flex justify-content-center align-items-center gap-2 mb-3 flex-wrap'>
            
            {/* Swap Button */}
            <button
              className='btn btn-sm mt-1'
              style={{height: '45px', width: '45px'}}
              onClick={handleSwapFilter}
            >
              <img src="/right-left-solid.svg" alt="Swap Filter" style={{ width: '100%', height: '100%' }} />
            </button>

            {/* Hero Role */}
            <ul className="nav nav-tabs mb-0">
              {(filterMode === 'role' ? roleTabs : laneTabs).map(tab => (
                <li className="nav-item" key={tab}>
                  <a 
                    className={`nav-link ${selectedFilter === tab ? 'active' : ''}`} 
                    role='button'
                    onClick={() => handleFilterSelect(tab)}
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>

          </div>
          
          {/* Hero Draft Component */}
          <div className={styles.heroScrollContainer}>
            <div className='d-flex flex-wrap'>
              {heroes.filter(hero => {
                if (teamBannedHeroIds.includes(hero.heroId) || enemyBannedHeroIds.includes(hero.heroId)) return false;
                if (selectedFilter === 'All' || selectedFilter === 'All Lanes') return true;
                if (filterMode === 'role') {
                  return hero.roles?.some((role: string) => 
                    role.toLowerCase() === selectedFilter.toLowerCase()
                  );
                }
                if (filterMode === 'lane') {
                  return hero.lanes?.some((lane: string) => 
                    lane.toLowerCase().includes(selectedFilter.toLowerCase().replace('lane', ''))
                  );
                }
                return true;
              }).map((hero) => 
                
                /* Heroes Display Component */
                <div
                  key={hero.heroId}
                  className={styles.heroCol}
                >
                  <img 
                    src={hero.icon} 
                    className={styles.heroIcon}
                    alt={hero.heroName}
                    onClick={() => handleHeroClick(hero)}
                  />
                  <p className="small">{hero.heroName}</p>
                </div>
  
              )
            }
            </div>
          </div>

          {/* Back + Next Buttons */}
          <div className="text-center mt-3">
            <button className="btn btn-secondary me-3 px-4" onClick={handleBack} disabled={phaseIndex === 0}>Back</button>
            <button className="btn btn-warning px-4" onClick={handleNext}>Next</button>
          </div>
        </div>

        {/* Right Sidebar: Enemy Picks */}
        <div className="col-2 border-start text-white">
          <h5 className='text-dark'>Enemy</h5>
          {[...Array(5)].map((_, i) => (

            /* Enemy Display Component */
            <div key={i} className="mb-3 text-center">
              <div className="bg-dark p-2 rounded">
                <img src="/enemy-placeholder.png" alt={`Enemy ${i + 1}`} className="img-fluid rounded mb-1" />
                <p className="mb-0">Enemy {i + 1}</p>
              </div>
            </div>

          ))}
        </div>

      </div>
    </div>
  );
}
