import "./serviceTable.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import SearchBar from "../search/searchBar";
import { SearchContext } from "../context/context";
import withRouter from '../navigate/navigate';
import Table from '../table/table.js'
import axios from 'axios';

class ServiceTable extends Component {
    
    static contextType = SearchContext;

  constructor(props) {
    super(props);
      this.state = {
        page: '',
        limit: '',
        search: "",
        bookingDetails: [],
        hasMore: true,
      
      }
    }

    // load on then start of the page 
    componentDidMount(){

      this.page = 1;    
      this.limit = 5;
      this.fetchCards()
      // this.getBookingDetails();

    }

    //  getBookingDetails = async () => {
    //     try{
    //         const res = await fetch(`/api/getBookings?page=${this.page}&limit=${this.limit}`, {
    //             method: "GET",
    //             headers: {
    //               'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //               "Content-Type": "application/json"},
                
    //         })

    //         const data = await res.json();


    //         if (!res.ok || !Array.isArray(data.data)) {
    //           window.location.reload(false);
    //           this.setState({ bookingDetails: []}); 
    //           return;
    //         }
    //         console.log("Bookind Details", data);
    //         this.setState(prev => ({
    //           bookingDetails: [...prev.bookingDetails, ...data.data],
    //           hasMore: this.page < data.totalPages 
    //         }));


    //     }catch(error){
    //         console.log(error)
    //     }
        
    //   }
      
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
    fetchCards = async () => {
            try {
                const res = await axios.post("/api/findDoc");

              
                this.setState({bookingDetails: res.data, loading: false})
                // const data = await res.json();
                this.setState({
                  hasMore: false 
                });
                // console.log(data)
            } catch (error) {
                console.log("ERROr in fetching cards")
            console.error(error);
            
            } 
    }
  render (){

    const headings = [
      { key: "id", label: "ID",},
      { key: "urlImage", label: "Image",},
      { key: "serviceTitle", label: "Service Title", sortable: true },
      { key: "price", label: "£ Price" },
      { key: "ServiceDescription", label: "Service Description" },
    ];


    return (
        <div className='bookingTablePageWrapper'>
            <Header/>
              <div className='pagetitle'>
                <div className="titleButton">
                  <h2>YOUR Services</h2>
                  <Button text='Create Service/Service Card' onClick={()=> this.props.navigate("/businessInteface")}/>
                  </div>
              </div>
              
            <div className="serachBookingsWrapper">

            </div>
            <Table
              isService={true}
              headings={headings}
              bookingDetails={this.state.bookingDetails}
              hasMore={this.state.hasMore}
              
              Page={this.Page.bind(this)}
            />
        </div>
    )
  }
}

export default withRouter(ServiceTable);