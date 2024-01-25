import React from 'react';
import ToggleImages from './components/pictures'; 
import Contact from './components/contact'; 
import Header from './components/header';
import Line from './components/styling/line';
import {SeparatorUp, SeparatorDown} from './components/styling/separators';
import GasPrices from './components/price';

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
        </div>
    );
};

export default App;


