import React from 'react';
export default ({payload}) => {
    return (
        <div style={{overflow: "auto"}}>
           <table className="ui table">
               <tbody>
                    <tr>
                        {payload.data.map((item, index) => {
                            console.log(item);
                            return (<td style={{backgroundColor: item.color}} key={index}>{item.text.toString()}</td>)
                        })}
                    </tr>
                    <tr>
                        {payload.axis.map((item, index) => (
                            <td key={index}>{item}</td>
                        ))}
                    </tr>
                </tbody>
            </table> 
        </div>
    );
}