import React from 'react'
import { IcM1 ,IcM2 , IcM3 , IcM4 , IcM5 , IcM6,IcM7,IcMShip } from "@cogoport/icons-react";
import { Tags } from "@cogoport/components";
import { useState } from 'react';

const map = {
    '1': <IcM1 />,
    '2': <IcM2 />,
    '3': <IcM3 />,
    '4': <IcM4 />,
    '5': <IcM5 />,
    '6': <IcM6 />,
    '7': <IcM7 />,
};
const ContainerCollapseCard = ({ index , data , onDelete}) => {
const { size, type, commodity, count } = data;
    const child = `${size} | ${type} |  ${commodity} | ${count}`;
    const options = [
        {
            key      : index,
            disabled : false,   
            children : child,
            prefix   : <IcMShip />,
            suffix   : null,
            color    : 'grey',
            tooltip  : true,
            closable : false,
        },
    ];

    const [largeItem, setLargeItem] = useState(options);
  return (
    <div>
        <div className="count">
            {map[index]}
        </div>
        <div className="tag">
            <Tags items={largeItem} onItemsChange={setLargeItem} size="lg" />
        </div>
        <div className="delete">
            <button onClick={onDelete}>Delete</button>
        </div>

    </div>
  )
}

export default ContainerCollapseCard