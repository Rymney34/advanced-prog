import Button from "../Tools/button/button";

const Table = ({ bookingDetails, hasMore, loadMore, Page, headings ,isService}) => {
  return (
    <div className="bookingTableWrapperBlock">
        <div className="tableWrapper">
            <table border="1" style={{ borderRadius: "5px" }} className="tableBlock">
                <thead className="tableHeading">
                    <tr className="tableHeadingWrapper">
                        {headings.map(h => (
                            <th
                                key={h.key}
                                className="tHeading"
                                style={h.style}
                            >
                                {h.label}
                            </th>
                        ))}
                    </tr>
                </thead>

          <tbody>
            {isService == true ? bookingDetails.map((details, index) => (
              <tr key={details.index} className="tableDescriptionWrapper">
                <td className="tableDescription">{index + 1}</td>
                <td className="tableDescription" style={{ padding: 10}}><img width="200" height="200" src={details.urlImage} alt="service Image"/></td>
                <td className="tableDescription">{details.serviceTitle}</td>
                <td className="tableDescription">{details.price}</td>
                <td className="tableDescription">{details.serviceDescription}</td>
              </tr>
            ))
            : bookingDetails.map((details, index) => (
              <tr key={details._id || index} className="tableDescriptionWrapper">
                <td className="tableDescription">{index + 1}</td>
                <td className="tableDescription">{details.serviceTitle}</td>
                <td className="tableDescription">{details.firstName}</td>
                <td className="tableDescription">{details.secondName}</td>
                <td className="tableDescription">{details.address}</td>
                <td className="tableDescription">{details.postCode}</td>
                <td className="tableDescription">{details.date}</td>
                <td className="tableDescription">{details.time}</td>
                <td className="tableDescription">{`+44 ${details.phoneNumber}`}</td>
                <td className="tableDescription">
                  <Button
                    style={{ margin: 10, width: 115 }}
                    onClick={() => Page(details)}
                    text="View Details"
                  />
                </td>
              </tr>
            ))
        }
            
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 0 0" }}>
          {hasMore && (
            <Button onClick={loadMore} style={{ width: 300 }} text="Load More" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;