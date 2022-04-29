import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';

function SearchResults({ docdata, val, user }) {
  console.log('doc ', docdata);
  const [data, setData] = useState(docdata);

  useEffect(() => {
    if (val !== '') {
      console.log(val);

      setData(
        docdata.filter((person) =>
          person.data().speciality[0].toLowerCase().includes(val.toLowerCase())
        )
      );

      console.log(data);
    } else {
      setData([]);
    }
  }, [val, docdata]);

  return (
    <div>
      {/* Search result card */}
      <SearchCard data={data} user={user} cid='From Search Results' />
    </div>
  );
}

export default SearchResults;
