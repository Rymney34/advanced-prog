import "./bookingTable.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import SearchBar from "../search/searchBar";
import { SearchContext } from "../context/context";
import withRouter from '../navigate/navigate';
import Table from '../table/table.js';
import Spinner from "../spinner/Spinner.js";

class BookingTable extends Component {
    
    static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
      page: '',
      limit: '',
      search: "",
      bookingDetails: [],
      hasMore: true,
      loading: false,
    }
        
    }

    // load on then start of the page 
    componentDidMount(){

      this.page = 1;    
      this.limit = 5;

      this.getBookingDetails();
     
      
    }

     getBookingDetails = async () => {
        try{
            this.setState({ loading: true });
            const res = await fetch(`/api/getBookings?page=${this.page}&limit=${this.limit}`, {
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  "Content-Type": "application/json"},
                
            })

            const data = await res.json();


            if (!res.ok || !Array.isArray(data.data)) {
              window.location.reload(false);
              this.setState({ bookingDetails: [],loading: false}); 
              return;
            }
            console.log("Bookind Details", data);
            this.setState(prev => ({
              bookingDetails: [...prev.bookingDetails, ...data.data],
              hasMore: this.page < data.totalPages,
              loading: false,
            }));


        }catch(error){
            console.log(error)
            this.setState({ loading: false });
        }
        
      }

      // handleCallBack = (childData) ={
      //   this.setState.
      // }

      
    Page(details) {
      this.props.navigate(`/singleBooking/${details._id}`, {
        state: {
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
  render (){

    const reset = () => {
      this.page = 1;
      this.setState({bookingDetails:[],hasMore:true})
      this.getBookingDetails();
    }
  

    const loadMore = () => {
        this.page += 1;
        console.log("State "+this.state.bookingDetails)
        this.getBookingDetails();
        
    }
    
    const { search } = this.context;

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

   
    const searchBooking = async () => {
        try{
            const res = await fetch(`/api/searchBooking?search=${search}`, {
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  "Content-Type": "application/json"},
                
            })

            const data = await res.json();
            
            console.log(data)
            this.setState({
              bookingDetails: data.data
            });
        }catch(error){
            console.log(error)
        }
      }

    return (
        
        <div className='bookingTablePageWrapper'>
            <Header/>
            <div className='pagetitle'>
                <h2>YOUR BOOKINGS</h2>
            </div>
            <div className="searchParagraph">
               <p>Search by Title, Surname, Address, Postcode and Press Search</p>
            </div>
            <div className="serachBookingsWrapper">
             
                <SearchBar/>
                <button 
                  style={{borderRadius: 15, width: 80, height: 40}}
                  onClick={searchBooking}
                  disabled={this.state.loading}
                >
                  Search
                </button>
                <button 
                  style={{borderRadius: 15, width: 80, height: 40}}
                  onClick={reset} 
                  // disabled={this.state.loading}
                >
                  Reset
                </button>
            </div>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <Table
                headings={headings}
                bookingDetails={this.state.bookingDetails}
                hasMore={this.state.hasMore}
                loadMore={loadMore}
                Page={this.Page.bind(this)}
              />
            )}
        </div>
    )
  }
}

export default withRouter(BookingTable);