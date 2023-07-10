import {Link} from 'react-router-dom';

const Navbar = (props) => {

	if(props.isLogged) {
	return(
		// <nav className="navbar navbar-expand-lg navbar-light bg-light">
		<nav className="navbar navbar-expand-lg navbar-light bg-info">
			<ul className="navbar-nav">
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/auctionspubliclist" className="nav-link">Huutokaupat</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/admin" className="nav-link">Ylläpito</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/" className="nav-link" onClick={props.logout}>Logout</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<p className="nav-link" style={{color:"blue"}}>Logged in as {props.user}</p>
				</li>
			</ul>
		</nav>		
	)
	} else {
		return(
			// <nav className="navbar navbar-expand-lg navbar-light bg-light">
			// <nav class="navbar navbar-dark bg-primary">
			<nav class="navbar navbar-dark bg-info">
				<p className="navbar-brand" style={{marginLeft:10}}>Huutokauppa palvelu</p>
				<ul className="navbar-nav">
				</ul>
			</nav>		
		)		
	}
	
}

export default Navbar;