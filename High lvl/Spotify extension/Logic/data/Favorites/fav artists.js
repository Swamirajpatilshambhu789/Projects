const token = 'BQCLjEb9v5wtNo-zGhdVCHYdTznv-RtZUIqQlDzKu6lI3WFdSBaCbth6451l9JCZv-s4V_I2KPGXf4T5TXFXgmrSGMCJ3cy4YajrBFm3EZehWTrfDQZ4H5i3ojpoBU82LD61vpoigx8cQ9QN2avWNVOFU5rKM78BPJgIb6GFwqFD9aWerrC4gX2D5VxKWYh_exDYZbBNRAzERc_7jph57w4nKfYc_jtBtm_MA2qlob3ZBKJgwpu8jJSroeQOkS0ocnI2G0EqQrN_A5ThkGThjbN5hzU9YTeyY_gHmtZnBj5yyjKTFl1YO4-PrcrbzwTi';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Spotify API error: ${res.status} - ${error.error.message}`);
  }

  return await res.json();
}

async function getTopArtists(token) {
  const res = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET'
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Spotify API error: ${res.status} - ${error.error.message}`);
  }

  const data = await res.json();
  return data.items.map(artist => ({
    name: artist.name,
    followers: artist.followers.total,
    popularity: artist.popularity
  }));
}

async function getArtistDetails(token, artistIdentifier) {
  // First, if we have a name instead of ID, search for the artist
  let artistId = artistIdentifier;
  if (!artistIdentifier.startsWith('spotify:artist:')) {
    const searchRes = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistIdentifier)}&type=artist&limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET'
    });

    if (!searchRes.ok) {
      const error = await searchRes.json();
      throw new Error(`Spotify API error: ${searchRes.status} - ${error.error.message}`);
    }

    const searchData = await searchRes.json();
    if (!searchData.artists.items.length) {
      throw new Error('Artist not found');
    }
    artistId = searchData.artists.items[0].id;
  }

  // Now fetch the artist details
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET'
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Spotify API error: ${res.status} - ${error.error.message}`);
  }

  const artist = await res.json();
  return {
    name: artist.name,
    followers: artist.followers.total,
    popularity: artist.popularity,
    genres: artist.genres,
    spotifyUrl: artist.external_urls.spotify
  };
}

module.exports = { getTopArtists, getArtistDetails };

// Self-invoking function to run the logic
(async () => {
  try {
    const topArtists = await getTopArtists(token);
    console.log("🎧 Your Top Artists:");
    console.log(topArtists);

    // Example of getting details for a specific artist
    const artistDetails = await getArtistDetails(token, "Taylor Swift");
    console.log("\n🎵 Artist Details:");
    console.log(artistDetails);
  } catch (err) {
    console.error(err.message);
  }
})();
