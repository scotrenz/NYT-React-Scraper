import React from "react";
import API from "../../utils/API";
import "./style.css"

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            savedArticles: [],
            title: "",
            startYear: "",
            endYear: ""
        };
    }

    componentDidMount() {
        this.loadSavedArticles()
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = event => {
        event.preventDefault();
            API.getArticles(this.state.title, this.state.startYear, this.state.endYear)
                .then(res => this.setState({ articles: res.data })) 
    };

    saveArticle = (title, date, url) => {
        API.saveArticle({
            title: title,
            date: date,
            url: url
        })
            .then(res => this.loadSavedArticles())
    };

    loadSavedArticles = () => {
        API.savedArticles()
            .then(res => this.setState({ savedArticles: res.data }))
    };

    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadSavedArticles())
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="input">
                        <label>Article Name</label>
                        {/* <input 
                            value={this.state.title}
                            onChange={this.handleInputChange}
                        /> */}
                        <input
                            onChange={this.handleInputChange}
                            name="title"
                            placeholder="Article Name"
                        />
                    </div>
                    <div className="input">
                        <label>Start Year</label>
                        <input
                            value={this.state.startYear}
                            onChange={this.handleInputChange}
                            name="startYear"
                            placeholder="YYYYMMDD Format"
                        />
                    </div>
                    <div className="input">
                        <label>End Year</label>
                        <input
                            value={this.state.endYear}
                            onChange={this.handleInputChange}
                            name="endYear"
                            placeholder="YYYYMMDD Format"
                        />
                    </div>
                    <a className="waves-effect waves-light btn" onClick={this.handleFormSubmit}>
                        Search
                    </a>
                </form>
                
                {this.state.articles.length 
                    ? (<div>
                    <h4 className="center">Results</h4>
                     
                        {this.state.articles.map(article => (
                            <ul key={article.url} className="collection with-header">
                                <br />
                                <li className="collection-header"><h4>{article.title}</h4></li>
                                <li className="collection-item"><a href={article.url} target="blank">{article.url}</a></li>
                                <li id="fix" className="collection-item">{article.date}<a className="secondary-content waves-effect waves-light btn blue" onClick={() => this.saveArticle(article.title, article.date, article.url)}> Save</a></li>
                            </ul>
                        ))}</div>)
                    : <div></div>} 
                

                

                {this.state.savedArticles.length
                    ? (<div>
                        <h4 className="center">Saved Articles</h4>
                        {this.state.savedArticles.map(article => (
                            <ul key={article.url} className="collection with-header">
                                <br />
                                <li className="collection-header"><h4>{article.title}</h4></li>
                                <li className="collection-item"><a href={article.url} target="blank">{article.url}</a></li>
                                <li id="fix" className="collection-item">{article.date}<a className="secondary-content waves-effect waves-light btn red" onClick={() => this.deleteArticle(article._id)}>
                                    Delete
                    </a></li>
                            </ul>
                        ))}</div>)
                    : <h1 className="center">No Saved Articles</h1>
                }
            </div>
        )
    }
}

export default Articles;