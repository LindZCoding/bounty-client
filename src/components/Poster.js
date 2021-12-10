const Poster = props => {
    let status = props.bounty.captured ? 'In Custody' : 'At Large'

    return (
        <div className="poster">
            <h2>{props.bounty.name}</h2>
            <h3>{status}</h3>
            <h3>Reward ${props.bounty.reward}</h3>
            <button onClick={() => props.changeCurrent(props.bounty)}>More</button>
            <button onClick={() => props.changeEditing(props.bounty)}>Edit</button>
        </div>
    )
}

export default Poster