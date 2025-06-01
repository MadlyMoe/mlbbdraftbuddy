'use client';

// Import libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './DraftPage.module.css';
import React, { use, useState, useEffect } from 'react';

export default function DraftPage() {
  const [teamBans, setTeamBans] = useState<string[]>([
    '/ban-1.png', '/ban-2.png', '/ban-3.png', '/ban-4.png', '/ban-5.png',
  ]);
  const [enemyBans, setEnemyBans] = useState<string[]>([
    '/ban-6.png', '/ban-7.png', '/ban-8.png', '/ban-9.png', '/ban-10.png',
  ]);

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
  const phases = [
    'Team is banning',
    'Enemy is picking',
    'Enemy is banning',
    'Team is picking',
  ];

  const handleNext = () => setPhaseIndex((phaseIndex + 1) % phases.length);
  const handleBack = () => setPhaseIndex((phaseIndex - 1 + phases.length) % phases.length);

  return (
    <div className="container-fluid py-4">
      {/* Top Ban Pools */}
      <div className="row justify-content-between mb-3">

        {/* Team Bans Component */}
        <div className="col-5 d-flex justify-content-start">
          {teamBans.map((src, i) => (
            <img key={i} src={src} alt={`Team Ban ${i}`} className="img-thumbnail mx-1" style={{ width: 50, height: 50 }} />
          ))}
        </div>
        
        {/* Enemy Bans Component */}
        <div className="col-5 d-flex justify-content-end">
          {enemyBans.map((src, i) => (
            <img key={i} src={src} alt={`Enemy Ban ${i}`} className="img-thumbnail mx-1" style={{ width: 50, height: 50 }} />
          ))}
        </div>

      </div>

      {/* Main Layout */}
      <div className="row">

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
                if (selectedFilter === 'All' || selectedFilter === 'All Lanes') return true;
                if (filterMode === 'role') {
                  return hero.roles?.some((role: string) => 
                    role.toLowerCase() === selectedFilter.toLowerCase()
                  );
                }
                if (filterMode === 'lane') {
                  return hero.lanes?.some((lane: string) => 
                    // lane.toLowerCase() === selectedFilter.toLowerCase()
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
                  />
                  <p className="small">{hero.heroName}</p>
                </div>
  
              )
            }
            </div>
          </div>

          {/* Back + Next Buttons */}
          <div className="text-center mt-3">
            <button className="btn btn-secondary me-3 px-4" onClick={handleBack}>Back</button>
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
