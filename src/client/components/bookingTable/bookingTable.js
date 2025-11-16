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
    
    }
        
    }

render (){
    
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
                                <th className="tHeading">First Name</th>
                                <th className="tHeading">Second Name</th>
                                <th className="tHeading">Address</th>
                                <th className="tHeading">Date & Time</th>
                                <th className="tHeading">Phone Number</th>
                                <th className="tHeading">Status</th>
                                <th className="tHeading"> </th>
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
                       
                            <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription"><Button text="View Details" /></td>
                            </tr>
                              {/* <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            v
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr>
                            
                              <tr  className="tableDescriptionWrapper">
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                                <td className="tableDescription">fsddsfsdfsd</td>
                            </tr> */}
                            
                       
                        </tbody>
                    </table>
                </div>
            </div>
            
           
            
        </div>
    )
  }
}

export default BookingTable;