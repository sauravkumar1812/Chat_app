import React from 'react'

const Applayout = () => WrappedComponent => {
    return (props) => {
        return (
            <div>
                <Header/>
                <WrappedComponent{...props}/>
                <div>Footer</div>
            </div>
          )
    }
}

export default Applayout