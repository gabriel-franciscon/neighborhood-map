import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {

    // Toggle filter on click
    toggleFilter() {
        const filter = document.querySelector('.filter')
        filter && filter.classList.toggle('active')
    }

    render() {
        return (
            <header>
                <button className="toggle-filter" title="Search for places" tabIndex="1" onClick={this.toggleFilter}>
                    <FontAwesomeIcon icon="bars" />
                </button>    
                <h1><FontAwesomeIcon icon="utensils" /> Atibaia Food Places</h1>
            </header>
        )
    }
}

export default Header