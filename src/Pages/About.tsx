import { useNavigate } from "react-router-dom"

export default function About(){
    const navigate = useNavigate()
    
    return (<>
        this is about page
        <button onClick={() => navigate(-1)}>Go Back</button>
    </>)
}