import "./bookingTable.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import SearchBar from "../search/searchBar";
import { SearchContext } from "../context/context";

class BookingTable extends Component {

    static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      bookingDetails: [],
    
    }
        
    }

    
    componentDidMount(){
      const getBookingDetails = async () => {
        try{
            const res = await fetch(`/api/getBookings`, {
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  "Content-Type": "applicaiton/json"},
                
            })

            const data = await res.json();
            console.log("Bookind Details", data);
            this.setState({bookingDetails:data})
            return data;

        }catch(error){
            console.log(error)
        }
        
      }
      getBookingDetails()
    }
  render (){
    

    const loadMore = () => {
        // getBookingDetails()
    }
    
    const { search } = this.context;

   
    return (
        
        <div className='bookingTablePageWrapper'>
            <Header/>
            <div className='pagetitle'>
                <h2>YOUR BOOKINGS</h2>
            </div>
            <div className="serachBookingsWrapper">
                <SearchBar/>
            </div>
            <div className="bookingTableWrapperBlock">
                <div className="tableWrapper">
                    <table border="1" style={{borderRadius:"5px"}} className="tableBlock">
                        <thead   className="tableHeading">
                            <tr className="tableHeadingWrapper">
                                <th className="tHeading">ID</th>
                                <th className="tHeading">Service Title</th>
                                <th className="tHeading">First Name</th>
                                <th className="tHeading">Second Name</th>
                                <th className="tHeading">Address</th>
                                <th className="tHeading">Postcode</th>
                                <th className="tHeading" style={{padding:"25px"}}>Date </th>
                                <th className="tHeading">Time</th>
                                <th className="tHeading">Phone Number</th>
                                <th className="tHeading" > </th>
                            </tr>
                        </thead>
                        <tbody >
                        {/* {currentItems.map((person) => (
                            <tr key={person.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3">{person.id}</td>
                                <td className="px-6 py-3">{person.name}</td>
                                <td className="px-6 py-3">{person.age}</td>
                                <td className="px-6 py-3">{person.job}</td>
                            </tr>
                        ))} */}
                        {this.state.bookingDetails.map((details,index) => (
                           <tr key={index} className="tableDescriptionWrapper" >
                                <td className="tableDescription">{index+1}</td>
                                <td className="tableDescription">{details.serviceTitle}</td>
                                <td className="tableDescription">{details.firstName}</td>
                                <td className="tableDescription">{details.secondName}</td>
                                <td className="tableDescription">{details.address}</td>
                                <td className="tableDescription">{details.postCode}</td>
                                <td className="tableDescription"  >{details.date}</td>
                                <td className="tableDescription">{details.time}</td>
                                <td className="tableDescription">{`+44 ${details.phoneNumber}`}</td>
                                <td className="tableDescription" ><Button style={{margin: 10, width: 115}} text="View Details" /></td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'center',  margin: '20px 0 0 0'}}>
                        <Button onClick={loadMore} style={{width: 300}} text="Load More"/>
                    </div>
                    
                </div>
            </div>
            
           
            
        </div>
    )
  }
}

export default BookingTable;