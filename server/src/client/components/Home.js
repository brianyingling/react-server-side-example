import React from 'react';

const Home = () => {
    return (
        <div>
            <div>Home Component</div>
            <button onClick={() => console.log('GOT HERE')}>
                Press me!
            </button>
        </div>
    );
};

export default Home;