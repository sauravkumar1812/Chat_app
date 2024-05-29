import React from 'react'

const Applayout = () => WrappedComponent => {
    return (props) => {
        return (
            <div>
                <div>Header</div>
                <WrappedComponent{...props}/>
                <div>Footer</div>
            </div>
          )
    }
}

export default Applayout