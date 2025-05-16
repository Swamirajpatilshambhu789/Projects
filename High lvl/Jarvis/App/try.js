// ⚠️ Make sure you set this token from your OAuth flow
const token = 'BQB6FJI88ULg2L8sBPMaRbx7omWoK_hkG-eETNlmdRid9VjyDFjHhg-ZT0OG6PAPc0_qLsnf2EoyObH9JXaDo3PLcUmWuiVmXK3XJopcPQ1N8206d2OF-Yr6DE23KsUzDn5MfVdTURIxyp-Pb3wdgPLDrsZ604l7oISYfAkJBHs7dXXmc8OjUqeTPj81iDXbWYMetIqAq7sPhfjP6ppT0ThmGfGTmw1XmqaH610dZ43Jp-yTkXeV2sU76QqHYKMBFDsNY4czcUZqa_z633eZwCS9_QxXR4LAnYoZggY6kSFZTPn839VGXR00z8-TVaR0';//Must be valid and scoped with user-top-read
// ⚠️ Replace with your actual Spotify access token with 'user-top-read' scope
// const token = 'YOUR_SPOTIFY_ACCESS_TOKEN';

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

async function getTopArtists() {
  // Endpoint: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/artists?time_range=long_term&limit=10',
    'GET'
  )).items;
}

// Self-invoking function to run the logic
(async () => {
  try {
    const topArtists = await getTopArtists();
    console.log("🎧 Your Top Artists:");
    topArtists.forEach((artist, index) => {
      console.log(`${index + 1}. ${artist.name}`);
      console.log(`   Genres: ${artist.genres.join(', ')}`);
      console.log(`   Popularity: ${artist.popularity}`);
      console.log(`   Spotify URL: ${artist.external_urls.spotify}\n`);
    });
  } catch (err) {
    console.error(err.message);
  }
})();
