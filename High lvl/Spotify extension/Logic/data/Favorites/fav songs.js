const token = 'BQCV5NGAgXI-eyHHmjbuNEZDHYZn6gUxQ7FhkjrzaKE9l1MjwwL5eKIjGoQCC3dpIU_S7pk9Xgb2vg0NVxp6naVmz6TnGmPf8L3B2Ztkk17GY-dqOSkN1vhYTGK1zbS8XoljazAfxkMsJBgVPc5lJCWFO0lnwOHlqhxFcrzxR0bD9ymYGeL8alVUBMybTCOokJCE0M34bb8EdjtRWOu1wvFWgr3UO1KeBc_hO3b8s2CiJJ4PUrDlGG14vzX0eJAHp_MjVfsopUdblMlRwOYtbn4ynJ7WkxDI2Bb3UD2Xzc-6EMZt99BnAt8vt8XdQVl_';
// const token = 'BQD-Kw5dbT2Nt8aHKT7PGLmRHY4c4LA_Yn-JaYIJIEEfvPLLK4akAuSUjGTJek996bb-qT7xPJkJLtO66U69cc8KHSmSs0uHELzRWSkr_GgPk9DWuHlm58GzqdPB0oZ8KtgHJHutwaGmW8urnEYY38MZvnA_wfbtaJbGpLZbcvREhnez-Y07VOhfymfjFQMsQqWI8s0QU2WUhI0SD9YTmsxyPrLiepvIYRq8gH16SUz9wcOCJeA06vKW69linNqd6NNyoHtii1mV-DXnLv6MT-trMbNEMJDRFxqz_DGyarM4ReXMAPwWFgO6v3XNl8Z4';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(token) {
  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`, {
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
  return data.items.map(track => ({
    name: track.name,
    artists: track.artists.map(artist => artist.name).join(', '),
    popularity: track.popularity
  }));
}

async function main() {
  
  const topTracks = await getTopTracks(token);
  console.log(
    topTracks?.map(
      ({name, artists}) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );
}
let favtracks = main()
// export { favtracks }
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

module.exports = getTopTracks;
