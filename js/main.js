function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
  
      const AMENITY_LIMIT = 6;

      function getAmenitiesCode(listing) {
      let amenities = [];

      try {
        const parsed = JSON.parse(listing.amenities);
        amenities = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.warn("Could not parse amenities for listing", listing.id, error);
      }

      if (amenities.length === 0) {
        return "";
      }

      const shown = amenities.slice(0, AMENITY_LIMIT);
      const remaining = amenities.length - shown.length;

      const badges = shown
        .map((amenity) => `<span class="badge text-bg-light">${amenity}</span>`)
        .join("");

      const more =
        remaining > 0
          ? `<span class="badge text-bg-secondary">+${remaining} more</span>`
          : "";

      return `<div class="amenities d-flex flex-wrap gap-1 mb-2">${badges}${more}</div>`;
    }

    return `<div class="col-12 col-sm-6 col-lg-4">
  <div class="listing card h-100">
    <div class = "listing-img">
      <img
        src="${listing.picture_url}"
        class="card-img-top"
        loading="lazy"
        alt="${listing.property_type}"
        onerror="this.onerror=null; this.src='images/missing.jpg'; this.classList.add('missing-img');"
      />
      <img src="${listing.host_thumbnail_url}"
      class="avatar"
      alt="host"
      onerror="this.onerror=null; this.src='images/missing.jpg'; this.classList.add('missing-host');"
      />
    </div>
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      ${getAmenitiesCode(listing)}
      <p class="card-text">
        ${listing.description}
      </p>
      <a href="${listing.listing_url}" class="btn btn-danger" target="_blank" rel="noopener noreferrer">Help Pay ${listing.host_name}'s Mortgage</a>
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