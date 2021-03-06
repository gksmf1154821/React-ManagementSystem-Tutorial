import React from 'react';
import CustomerDelete from './CustomerDelete';
import CustomerUpdate from './CustomerUpdate';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Customer extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" /></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>
                    <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/>
                    <CustomerUpdate stateRefresh={this.props.stateRefresh} id={this.props.id}/>
                </TableCell>
            </TableRow>
        )
    }
}

/*class CustomerProfile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} alt="profile" />
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                <h2>{this.props.birthday}</h2>
                <h2>{this.props.gender}</h2>
                <h2>{this.props.job}</h2>
            </div>
        )
    }
}
*/
export default Customer;
