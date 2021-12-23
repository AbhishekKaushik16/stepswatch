import axios from 'axios';
import React, {useState, useEffect, Component} from 'react'

const url = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'

class InfiniteScroll extends Component {
    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.setState({page: this.state.page + 1});
            this.setState({ isLoading: true });
            this.getBooks(this.state.page);
            console.log("Reached bottom");
            console.log(this.isLoading);
        }
    }    
    constructor() {
        super();
        this.state = {
            isLoading: false,
            page: 1,
            books: [],
            prevY: 0,
        };
    }
    componentDidMount() {
        this.getBooks(this.state.page);
    }
    getBooks(page) {
        axios.get(url+'&page='+page+'&limit=20')
        .then(res => {
            console.log(res.data);
            this.setState({
                books: [ ...this.state.books , ...res.data.docs],
            });
            this.setState({ isLoading: false });
        });
    }

    render() {
        return (
            <div className='container' onScroll={this.handleScroll} style={{overflowY: 'scroll', maxHeight: '400px',maxWidth: "400px", border: "solid", alignItems: "center", alignSelf: "center"}}>
                <div>
                    {this.state.books.map((book, index) => {
                        return (
                            <div key={index} style={{height: "100px", border: "solid"}}>{book.title}</div>
                        )
                    })}
                    <div style={{display: this.state.isLoading ? "block": "none"}}>Loading...</div>
                </div>
            </div>
        );
    }
}

export default InfiniteScroll;