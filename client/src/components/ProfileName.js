import React from 'react'

const ProfileName = (props) => {
    let styles = {textAlign: 'center', color: 'white', fontWeight: 600}
    return (
        <div style={styles}>
            <p>{props.name}</p>
            <p>{props.description}</p>
        </div>
    )
}

export default ProfileName