import { useState, useEffect } from "react"

const EditBounty = props => {

    const [newBounty, setNewBounty] = useState({})

    useEffect(() => {
        console.log(props.bounty._id)
        setNewBounty({
            name: props.bounty.name,
            wantedFor: props.bounty.wantedFor,
            client: props.bounty.client,
            reward: props.bounty.reward,
            captured: props.bounty.captured
        })
    }, [props])

    const handleChange = e => {
        setNewBounty({...newBounty, [e.target.name]: e.target.value})
    }

    const handleCheck = e => {
        setNewBounty({...newBounty, captured: e.target.checked})
    }

    const postBounty = e => {
        e.preventDefault()
        let preJSONBody = {
            name: newBounty.name,
            wantedFor: newBounty.wantedFor,
            client: newBounty.client,
            reward: Number(newBounty.reward),
            captured: Boolean(newBounty.captured)
        }
            fetch(`http://localhost:8000/bounties/${props.bounty._id}?_method=PUT`, {
                method: 'POST',
                body: JSON.stringify(preJSONBody),
                headers: {'Content-Type':'application/json'}
            })
            .then(response => response.json())
                .then(postedBounty => {
                props.refreshBounties()
                setNewBounty({})
            })
        .catch(err=>console.error(err))
    }

    

    return (
        <form onSubmit={postBounty}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={newBounty.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="wantedFor">Wanted For:</label>
                <input type="text" name="wantedFor" id="wantedFor" value={newBounty.wantedFor} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="client">Client:</label>
                <input type="text" name="client" id="client" value={newBounty.client} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="reward">Reward:</label>
                <input type="number" name="reward" id="reward" value={newBounty.reward} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="captured">Captured:</label>
                <input type="checkbox" name="captured" id="captured" checked={ newBounty.captured ? "checked" : "" } onChange={handleCheck}/>
            </div>
            <input type="submit" value="Post" />
        </form>
    )
}

export default EditBounty