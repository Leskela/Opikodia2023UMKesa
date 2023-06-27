import {Link} from 'react-router-dom';

const Navbar = () => {
	
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			{/* <p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p> */}
			<p className="navbar-brand" style={{marginLeft:10}}>Huutokauppa palvelu</p>

			<ul className="navbar-nav">
				{/* <li className="nav-item" style={{marginLeft:10}}>
					<Link to="/" className="nav-link">Shopping List</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/form" className="nav-link">Add new item</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/testi" className="nav-link">Testi</Link>
				</li> */}

				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/AuctionsList" className="nav-link">Huutokauppa lista</Link>
				</li>
				{/* <li className="nav-item" style={{marginLeft:10}}>
					<Link to="/newauctionform" className="nav-link">Lisää huutokauppa</Link>
				</li> */}
			</ul>
		</nav>		
	)

}

export default Navbar;