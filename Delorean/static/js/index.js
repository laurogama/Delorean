var mcFly = new McFly();

var App = React.createClass({
        loadCommentsFromServer: function () {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function (data) {
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        getInitialState: function () {
            return {
                data: {
                    participants: []
                },
                listVisible: true
            };
        },
        componentDidMount: function () {
            this.loadCommentsFromServer();
            setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        },
        handleAccordion: function () {
            this.setState(
                {
                    listVisible: !this.state.listVisible
                }
            );
        }
        ,
        render: function () {
            if (this.state.data.participants.length === 0) {
                this.listVisible = false;
            }
            return (<div  className="App" onclick={this.handleAccordion}>
                <h1>Event:&nbsp;{this.state.data.showTitle}</h1>
                <h2>Participants</h2>
                <ParticipantsList  visibility={this.state.listVisible}
                    data={this.state.data}/>
            </div>
            );
        }
    })
    ;

var ParticipantsList = React.createClass({
    render: function () {
        var participantsNodes = null;
        if (!this.props.visibility) {
            participantsNodes = "No Participants"
        } else {
            participantsNodes = this.props.data.participants.map(function (participant) {
                    return (
                        <Participant data={participant}></Participant>);
                }
            );
        }
        return (
            <div className="ParticipantsList">
            {participantsNodes}
            </div>);
    }

});
var Participant = React.createClass({
        getInitialState: function () {
            return {
                liked: false,
                color: 'red',
                likes: this.props.data.likes
            };
        },
        handleClick: function () {
            this.setState(
                {
                    liked: !this.state.liked,
                    likes: this.state.likes + 1
                }
            );
        },
        render: function () {
            this.state.color = this.state.liked ? 'gray' : 'red';
            var componentStyle = {
                color: this.state.color,
                background: '#004433'
            };
            return (
                <div className="participant" onClick={this.handleClick} style={componentStyle}>
                    <h2 className="participantName">{this.props.data.name}</h2>
                    <p>{this.props.data.profession}</p>
                    <p>{this.state.likes}</p>
                </div>);
        }
    })
    ;
React.render(<App url="participants" pollInterval={2000} />, document.getElementById("mydiv"));