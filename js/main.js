function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    return `<div class="col-12 col-sm-6 col-lg-4">
  <div class="listing card h-100">
    <div class = "listing-img">
      <img
        src="${listing.picture_url}"
        class="card-img-top"
        alt="${listing.property_type}"
        onerror="this.onerror=null; this.src='images/missing.jpg'; this.classList.add('missing-img');"
      />
      <img src="${listing.host_picture_url}"
      class="avatar"
      onerror="this.onerror=null; this.src='images/missing.jpg'; this.classList.add('missing-host');"
      />
    </div>
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      <p class="card-text">
        ${listing.description}
      </p>
      <p class="host">
        By ${listing.host_name}
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();