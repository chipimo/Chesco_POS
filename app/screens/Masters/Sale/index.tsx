import React = require("react");
import { connect } from 'react-redux'

export const index = () => {
    return (
        <div style={{display:'flex', width:'100%'}}>
            <div style={{width:'40%'}}>1</div>
            <div style={{width:'40%'}}>2</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
