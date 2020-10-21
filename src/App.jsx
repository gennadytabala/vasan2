
const initialIssues = [
	{
		id:1,
		status:'New',
		owner: 'Ravan',
		effort: '5',
		created: new Date('2018-05-16'),
		due: undefined,
		title: 'Error in console when clicking Add'
	},
	{
		id:2,
		status:'Assigned',
		owner: 'Eddie',
		effort: '14',
		created: new Date('2018-08-03'),
		due: new Date('2018-08-22'),
		title: 'Missing bottom border on panel'
	}
];

class IssueFilter extends React.Component {
	render() {
		return (
			<div>This is a placeholder for the issue filter.</div>
		);
	}
}

class IssueTable extends React.Component {

	constructor() {
		super();
		this.state = {issues: []};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData(){
		setTimeout(() => this.setState({issues: initialIssues}), 500);
	}

	render() {
		const issueRows = this.state.issues.map(
			issue => <IssueRow key = {issue.id} issue = {issue}>{issue.title}</IssueRow>
			);
		return (
			<table className = "bordered-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Status</th>
						<th>Owner</th>
						<th>Created</th>
						<th>Effort</th>
						<th>DueDate</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{issueRows}
				</tbody>
			</table>
		);
	}
}

class IssueRow extends React.Component {
	render() {
		const issue = this.props.issue;
		return (
			<tr>
				<td >{issue.id}</td>
				<td >{issue.status}</td>
				<td >{issue.owner}</td>
				<td >{issue.created.toDateString()}</td>
				<td >{issue.effort}</td>
				<td >{issue.due ? issue.due.toDateString(): ''}</td>
				<td >{issue.title}</td>
			</tr>
		);
	}
}

class IssueAdd extends React.Component {
	render() {
		return (
			<div>This is a placeholder for the issue Add.</div>
		);
	}
}

class IssueList extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable />
				<hr />
				<IssueAdd />
			</React.Fragment>
		);
	}
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('content'));
