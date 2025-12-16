// import "./serviceTable.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import SearchBar from "../search/searchBar.js";
import { SearchContext } from "../context/context";
import withRouter from '../navigate/navigate';
import Table from '../table/table.js'
import axios from 'axios';
import LocalSearchBar from './localSearchBar.js'

class serviceBookings extends Component {
    

  constructor(props) {
    super(props);
    //states
      this.state = {
        page: 1,
        limit: 20,
        bookingDetails: [],
        bookingsMap: new Map(), //Actual hash table
        search: "",
        hasMore: true,
      };
    }

    // load on then start of the page 
    componentDidMount(){
        this.getAllBookings()
      // this.getBookingDetails();

    }
      
    Page(details) {
        this.props.navigate(`/singleBooking/${details._id}`, {
            state: {
                isAdmin: true,
                _id: details._id,
                serviceTitle: details.serviceTitle,
                firstName: details.firstName,
                secondName: details.secondName,
                address: details.address,
                postCode: details.postCode,
                date: details.date,
                time: details.time,
                phoneNumber: details.phoneNumber,
                bookingNote: details.bookingNote,
            },
        });
    }

    getAllBookings = async () => {
        try {
          //disctruture 
          const { page, limit, bookingsMap } = this.state;
          //psot request
          const res = await axios.post("/api/getAllBookings", {
            page,
            limit
          });
          // extracting data from response
          const newBookings = res.data.data;
          //check lenght of the document to render right amount
          if (newBookings.length < limit) {
            this.setState({ hasMore: false });
          }

          // clooning existing booking map for react as it should be immutable
          const updatedMap = new Map(bookingsMap);

          //loops over each booking key by id as its unique
          newBookings.forEach(booking => {
            updatedMap.set(booking._id, booking);
          });

          //setting sets
          this.setState({
            bookingsMap: updatedMap,
            bookingDetails: Array.from(updatedMap.values()),
            page: page + 1
          });

        } catch (error) {
          console.error("Error fetching bookings", error);
        }
    };

    //search trough already fetched data 
    handleSearch = (value) => {
      // distructure
      this.setState({ search: value });
      //conversts to lower
      const search = value.toLowerCase();

      // validation
      if (!search) {
        this.setState({
          bookingDetails: Array.from(this.state.bookingsMap.values())
        });
        return;
      }
      //search among this fields
      const filtered = Array.from(this.state.bookingsMap.values()).filter(
        booking =>
          booking.firstName?.toLowerCase().includes(search) ||
          booking.secondName?.toLowerCase().includes(search) ||
          booking.serviceTitle?.toLowerCase().includes(search) ||
          booking.address?.toLowerCase().includes(search)
      );
      // passing found to state
      this.setState({ bookingDetails: filtered });
    };

    render (){

    const headings = [
        { key: "id", label: "ID", sortable: true },
        { key: "serviceTitle", label: "Service Title", sortable: true },
        { key: "firstName", label: "First Name" },
        { key: "secondName", label: "Second Name" },
        { key: "address", label: "Address" },
        { key: "postcode", label: "Postcode" },
        { key: "date", label: "Date", style: { padding: "25px" } },
        { key: "time", label: "Time" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "actions", label: "", sortable: false },
    ];


    return (
        <div className='bookingTablePageWrapper'>
            <Header/>
              <div className='pagetitle'>
                <div className="titleButton">
                    <h2>Your Are Booked</h2>
                    <div style={{display:"flex", justifyContent:"center"}}>
                     <LocalSearchBar
                        value={this.state.search}
                        onChange={this.handleSearch}
                      />
                    </div>
                </div>
              </div>
              
            <div className="serachBookingsWrapper">

            </div>
            <Table
                headings={headings}
                bookingDetails={this.state.bookingDetails}
                
                Page={this.Page.bind(this)}
            />
            
            {this.state.hasMore && (
              <div style={{display:"flex", alignItems:'center', justifyContent:'center', marginBottom:"40px"}}>
                <Button text="Load more"onClick={this.getAllBookings}>
                </Button>
              </div>
            )}
        </div>
    )
  }
}

export default withRouter(serviceBookings);