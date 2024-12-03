import React from 'react'
import treeImage1 from "../assets/images/line.png";
import treeImage2 from "../assets/images/line2.png";

const Trees = ({treeRef1 , treeRef2}) => {
    return (
        <>
            <div
                className="line"
                ref={treeRef1}
                style={{
                    background: `url(${treeImage1}) , url(${treeImage2}) `,
                    backgroundRepeat: 'repeat-x , repeat-x',
                    backgroundSize: 'contain',
                    backgroundPositionY: `bottom`,
                    position: 'absolute',
                    width: '110vw',
                    height: '15vh',
                    top: '48.5%',
                    left: '29%',
                    transform: 'translate(-46%, -1%) rotateY(79deg) rotateZ(0.5deg)',
                    zIndex: '-100',
                    border: '1px solid transparent',
                }}
            ></div>
            <div
                className="line"
                ref={treeRef2}
                style={{
                    background: `url(${treeImage1}) , url(${treeImage2}) `,
                    backgroundRepeat: 'repeat-x , repeat-x',
                    backgroundSize: 'contain',
                    backgroundPositionY: `bottom`,
                    position: 'absolute',
                    width: '110vw',
                    height: '15vh',
                    top: '48.5%',
                    left: '29%',
                    transform: 'translate(-15%, -1%) rotateY(101deg) rotateZ(0.5deg)',
                    zIndex: '-100',
                    border: '1px solid transparent',
                }}
            ></div>
        </>
    )
}

export default Trees