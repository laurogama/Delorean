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
                }
            };
        },
        componentDidMount: function () {
            this.loadCommentsFromServer();
            setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        },
        render: function () {
            return (<div  className="App">
                <h1>Event:&nbsp;{this.state.data.showTitle}</h1>
                <h2>Participants</h2>
                <ParticipantsList data={this.state.data}/>
            </div>
            );
        }
    })
    ;

var ParticipantsList = React.createClass({
    render: function () {
        console.log(this.props.data);
        var participantsNodes = this.props.data.participants.map(function (participant) {
            return (
                <Participant data={participant}></Participant>);
        });
        return (
            <div className="ParticipantsList">
        {participantsNodes}
            </div>);
    }
});
var Participant = React.createClass({
    render: function () {
        return (
            <div className="participant">
                <h2 className="participantName">{this.props.data.name}</h2>
                <p>{this.props.data.profession}</p>
                <p>{this.props.data.id}</p>

            </div>);
    }
});
React.render(<App url="participants" pollInterval={2000} />, document.getElementById("mydiv"));