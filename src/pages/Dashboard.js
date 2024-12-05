import React, { useState } from 'react';

function Dashboard() {
    const [filter, setFilter] = useState('24h'); // Filtr aktywności
    const activities = [
        { id: 1, user: 'Andrzej', action: 'zmienił status dostawy na Zakończono', time: '1 godzina temu' },
        { id: 2, user: 'Iryna', action: 'rozpoczęła nową dostawę', time: '3 godziny temu' },
        { id: 3, user: 'Marek', action: 'usunął dostawę', time: 'wczoraj' },
    ];

    const filteredActivities = activities.filter(activity => {
        if (filter === '24h') {
            return !activity.time.includes('wczoraj');
        }
        return true;
    });

    return (
        <div className="main-content">
            <h1>Pulpit</h1>
            <div className="stats">
                <div className="card">
                    <h2>Zakończone Dostawy</h2>
                    <p>100%</p>
                </div>
                <div className="card">
                    <h2>Ilość Dostaw</h2>
                    <p>11</p>
                </div>
            </div>
            <div className="activity-log">
                <h2>Ostatnia aktywność</h2>
                <div>
                    <button
                        className={filter === '24h' ? 'active-filter' : ''}
                        onClick={() => setFilter('24h')}
                    >
                        Ostatnie 24h
                    </button>
                    <button
                        className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => setFilter('all')}
                    >
                        Wszystkie
                    </button>
                </div>
                {filteredActivities.map(activity => (
                    <div className="log-item" key={activity.id}>
                        <p>{activity.user} {activity.action}</p>
                        <p>{activity.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
