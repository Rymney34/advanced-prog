import "./bookingTable.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import SearchBar from "../search/searchBar";
import { SearchContext } from "../context/context";
import withRouter from '../navigate/navigate';

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
            const res = await fetch(`/api/getBookings?page=${this.page}&limit=${this.limit}`, {
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  "Content-Type": "application/json"},
                
            })

            const data = await res.json();


            if (!res.ok || !Array.isArray(data.data)) {
              window.location.reload(false);
              this.setState({ bookingDetails: []}); 
              return;
            }
            console.log("Bookind Details", data);
            this.setState(prev => ({
              bookingDetails: [...prev.bookingDetails, ...data.data],
              hasMore: this.page < data.totalPages 
            }));


        }catch(error){
            console.log(error)
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
      this.setState({bookingDetails:[]})
      this.getBookingDetails();
    }
  

    const loadMore = () => {
        // getBookingDetails()
        this.page += 1;
        console.log("State "+this.state.bookingDetails)
        this.getBookingDetails();
        
    }
    
    const { search } = this.context;

   
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

      // function Page (props){
      //   console.log("PAGE")
      //   let nav = () => withRouter.navigate
      //   nav(`/singleBooking/${props.id}`,
      //             {
      //             state:{
      //               servicetitle:props.servicetitle,
                  
      //              }});  
            
      //   }



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
                <button style={{borderRadius: 15, width: 80, height: 40}} onClick={searchBooking}>
                  Search
                </button>
                <button style={{borderRadius: 15, width: 80, height: 40}} onClick={reset}>
                  Reset
                </button>
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
                                <td className="tableDescription" >
                                  <Button style={{margin: 10, width: 115}} onClick={() => this.Page(details)} text="View Details" />
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'center',  margin: '20px 0 0 0'}}>
                      {this.state.hasMore == true ?  <Button onClick={loadMore} style={{width: 300}} text="Load More"/> : <></>}
                       
                    </div>
                    
                </div>
            </div>
            
           
            
        </div>
    )
  }
}

export default withRouter(BookingTable);