import Header from '@/components/Navbar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
             <Header></Header>
            <main>{children}</main>
        </div>
    );
};

export default layout;