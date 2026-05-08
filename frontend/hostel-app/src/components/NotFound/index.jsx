import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class NotFound extends Component{

    render(){
        return(
            <div className="dashboard-background-container">
                <div className="not-found-container">
                    <h1>401</h1>
                    <h1>Page Not Found</h1>
                    <Link to="/">Go to Dashboard</Link>
                </div>
            </div>
        )
    }

}

export default NotFound;