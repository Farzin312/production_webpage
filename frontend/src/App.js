import React from 'react';
import ToggleImages from './components/pictures'; 
import Contact from './components/contact'; 
import Header from './components/header';
import Line from './components/styling/line';
import {SeparatorUp, SeparatorDown} from './components/styling/separators';
import GasPrices from './components/price';
import Hours from './components/hours';
const App = () => {

    return (
        <div>
            <Header />
            <SeparatorUp />
            <Line up={10} down={5}/>
            <SeparatorDown />
            <ToggleImages />         
            <GasPrices />
            <Contact />
            <div style={{ marginTop: '350px', padding: '25px', backgroundColor: '#f0f0f0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Hours />
            </div>
        </div>
    );
};

export default App;


